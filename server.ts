import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Interface for clean normalized Google Maps place result
export interface NormalizedMapPlace {
  place_id?: string;
  title: string;
  address?: string;
  rating?: number;
  reviews?: number;
  type?: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  thumbnail?: string;
  hours?: string;
  maps_link?: string;
}

// Helper to normalize SerpApi Google Maps item
function normalizeSerpApiPlace(item: any): NormalizedMapPlace {
  let hoursDisplay: string | undefined = undefined;
  if (typeof item.operating_hours === "string") {
    hoursDisplay = item.operating_hours;
  } else if (item.operating_hours && typeof item.operating_hours === "object") {
    hoursDisplay = JSON.stringify(item.operating_hours);
  } else if (typeof item.hours === "string") {
    hoursDisplay = item.hours;
  }

  return {
    place_id: item.place_id || item.data_id || undefined,
    title: item.title || "Untitled Place",
    address: item.address || undefined,
    rating: typeof item.rating === "number" ? item.rating : (item.rating ? parseFloat(item.rating) : undefined),
    reviews: typeof item.reviews === "number" ? item.reviews : (item.reviews ? parseInt(item.reviews, 10) : undefined),
    type: item.type || (Array.isArray(item.types) ? item.types[0] : undefined),
    phone: item.phone || undefined,
    website: item.website || undefined,
    latitude: item.gps_coordinates?.latitude ?? (item.latitude ? parseFloat(item.latitude) : undefined),
    longitude: item.gps_coordinates?.longitude ?? (item.longitude ? parseFloat(item.longitude) : undefined),
    thumbnail: item.thumbnail || undefined,
    hours: hoursDisplay,
    maps_link: item.link || item.google_maps_link || (item.place_id ? `https://www.google.com/maps/place/?q=place_id:${item.place_id}` : undefined)
  };
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// SerpApi Google Maps Search endpoint (Supports both GET & POST)
app.all("/api/maps/search", async (req: Request, res: Response) => {
  try {
    const query = (req.body?.q || req.query?.q || "").toString().trim();

    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Search query 'q' is required. Example: { \"q\": \"homestay near Bat Trang\" }"
      });
    }

    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "SERPAPI_KEY is not configured in server environment variables."
      });
    }

    // Build SerpApi Google Maps URL
    const serpApiUrl = new URL("https://serpapi.com/search");
    serpApiUrl.searchParams.set("engine", "google_maps");
    serpApiUrl.searchParams.set("q", query);
    serpApiUrl.searchParams.set("api_key", apiKey);

    // Optional parameters if provided in request
    if (req.body?.ll || req.query?.ll) {
      serpApiUrl.searchParams.set("ll", (req.body?.ll || req.query?.ll).toString());
    }
    if (req.body?.hl || req.query?.hl) {
      serpApiUrl.searchParams.set("hl", (req.body?.hl || req.query?.hl).toString());
    } else {
      serpApiUrl.searchParams.set("hl", "vi"); // default language
    }

    const response = await fetch(serpApiUrl.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401 || response.status === 403) {
      return res.status(response.status).json({
        success: false,
        error: "Authentication failed with SerpApi. Please check if SERPAPI_KEY is valid."
      });
    }

    if (response.status === 429) {
      return res.status(429).json({
        success: false,
        error: "SerpApi rate limit exceeded or quota exhausted."
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        success: false,
        error: `SerpApi returned status ${response.status}: ${errorText}`
      });
    }

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({
        success: false,
        error: data.error
      });
    }

    // Extract places from local_results or place_results
    let rawPlaces: any[] = [];
    if (Array.isArray(data.local_results)) {
      rawPlaces = data.local_results;
    } else if (data.place_results) {
      rawPlaces = [data.place_results];
    }

    const normalizedPlaces: NormalizedMapPlace[] = rawPlaces.map(normalizeSerpApiPlace);

    return res.json({
      success: true,
      query,
      total_results: normalizedPlaces.length,
      results: normalizedPlaces
    });
  } catch (error: any) {
    console.error("Error executing SerpApi Google Maps search:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Internal server error while fetching Google Maps results."
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NomadNest Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
