import React, { useState } from 'react';
import { UserRole, Village, Property } from './types';
import { MOCK_USERS, MOCK_VILLAGES, MOCK_PROPERTIES } from './data/mockData';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { GuestRegistrationScreen } from './components/screens/GuestRegistrationScreen';
import { HostRegistrationScreen } from './components/screens/HostRegistrationScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { SearchResultsScreen } from './components/screens/SearchResultsScreen';
import { VillageDetailScreen } from './components/screens/VillageDetailScreen';
import { PropertyDetailScreen } from './components/screens/PropertyDetailScreen';
import { RoomOptionsScreen } from './components/screens/RoomOptionsScreen';
import { AddRoomScreen } from './components/screens/AddRoomScreen';
import { BookingSummaryScreen } from './components/screens/BookingSummaryScreen';
import { BookingCheckoutScreen, BookingCheckoutData } from './components/screens/BookingCheckoutScreen';
import { TranslatorScreen } from './components/screens/TranslatorScreen';
import { MapScreen } from './components/screens/MapScreen';
import { GrabServicesScreen } from './components/screens/GrabServicesScreen';
import { LocalServicesScreen } from './components/screens/LocalServicesScreen';
import { LocalGuideScreen } from './components/screens/LocalGuideScreen';
import { ChatListScreen } from './components/screens/ChatListScreen';
import { HostChatScreen } from './components/screens/HostChatScreen';
import { HostDashboardScreen } from './components/screens/HostDashboardScreen';
import { HostListingsScreen } from './components/screens/HostListingsScreen';
import { HostReservationsScreen } from './components/screens/HostReservationsScreen';
import { HostRevenueScreen } from './components/screens/HostRevenueScreen';
import { AccountScreen } from './components/screens/AccountScreen';
import { MyBookingsScreen } from './components/screens/MyBookingsScreen';

// Common UI
import { Header } from './components/common/Header';
import { GuestBottomNav } from './components/common/GuestBottomNav';
import { HostBottomNav } from './components/common/HostBottomNav';

import { saveCurrentUserToStorage, getCurrentUserFromStorage, CurrentUserProfile } from './utils/userStorage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile>(() => getCurrentUserFromStorage('nomad_user'));
  const [currentRole, setCurrentRole] = useState<UserRole>(() => currentUser?.role || 'nomad_user');
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [selectedVillage, setSelectedVillage] = useState<Village>(MOCK_VILLAGES[0]);
  const [selectedProperty, setSelectedProperty] = useState<Property>(MOCK_PROPERTIES[0]);
  const [activeBottomTab, setActiveBottomTab] = useState<string>('home');

  const [selectedBookingCheckoutData, setSelectedBookingCheckoutData] = useState<BookingCheckoutData>({
    title: 'Phòng Homestay Làng Nam Ô',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    location: 'Làng nước mắm Nam Ô, Đà Nẵng',
    villageName: 'Làng nước mắm Nam Ô',
    checkIn: '10/08/2026',
    checkOut: '15/08/2026',
    nightsCount: 5,
    guestsCount: 1,
    pricePerNight: 850000
  });

  // Keep state synchronized with storage updates
  React.useEffect(() => {
    const syncUser = () => {
      const user = getCurrentUserFromStorage(currentRole);
      setCurrentUser(user);
      if (user?.role) {
        setCurrentRole(user.role);
      }
    };

    syncUser();

    window.addEventListener('nomad_user_updated', syncUser);
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('nomad_user_updated', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, [currentRole]);

  // Helper to get role home screen
  const getRoleHome = (role: UserRole) => {
    if (role === 'local_host') return 'host_dashboard';
    return 'home';
  };

  // Called when user completes login or sign up form
  const handleAuthSuccess = (role: UserRole) => {
    const user = getCurrentUserFromStorage(role);
    setCurrentUser(user);
    setCurrentRole(role);
    if (role === 'local_host') {
      setCurrentScreen('host_dashboard');
      setActiveBottomTab('dashboard');
    } else {
      setCurrentScreen('home');
      setActiveBottomTab('home');
    }
  };

  // Handle Quick Role Login (Skip or direct demo role switch)
  const handleQuickRoleLogin = (role: UserRole) => {
    const existing = getCurrentUserFromStorage(role);
    if (existing && existing.name) {
      setCurrentUser(existing);
      setCurrentRole(role);
    } else {
      const userToSave = MOCK_USERS[role] || MOCK_USERS.nomad_user;
      saveCurrentUserToStorage({
        id: userToSave.id,
        name: userToSave.name,
        email: userToSave.email,
        avatar: userToSave.avatar,
        role: userToSave.role,
        badge: userToSave.badge
      });
      setCurrentUser(userToSave);
      setCurrentRole(role);
    }

    if (role === 'local_host') {
      setCurrentScreen('host_dashboard');
      setActiveBottomTab('dashboard');
    } else {
      setCurrentScreen('home');
      setActiveBottomTab('home');
    }
  };

  // Handle Guest Bottom Nav Navigation
  const handleGuestTabChange = (tab: 'home' | 'services' | 'chat' | 'account') => {
    setActiveBottomTab(tab);
    if (tab === 'home') setCurrentScreen('home');
    else if (tab === 'services') setCurrentScreen('local_services');
    else if (tab === 'chat') setCurrentScreen('chat');
    else if (tab === 'account') setCurrentScreen('account');
  };

  // Handle Host Bottom Nav Navigation
  const handleHostTabChange = (tab: 'dashboard' | 'add_room' | 'translator' | 'chat' | 'account') => {
    setActiveBottomTab(tab);
    if (tab === 'dashboard') setCurrentScreen('host_dashboard');
    else if (tab === 'add_room') setCurrentScreen('add_room');
    else if (tab === 'translator') setCurrentScreen('translator');
    else if (tab === 'chat') setCurrentScreen('chat');
    else if (tab === 'account') setCurrentScreen('account');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onExplore={() => setCurrentScreen('login')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onSelectRoleLogin={handleAuthSuccess}
            onContinueEmail={(role) => {
              if (role === 'local_host') setCurrentScreen('host_register');
              else setCurrentScreen('guest_register');
            }}
          />
        );

      case 'guest_register':
        return (
          <GuestRegistrationScreen
            onSuccess={() => handleAuthSuccess('nomad_user')}
            onCancel={() => setCurrentScreen('login')}
          />
        );

      case 'host_register':
        return (
          <HostRegistrationScreen
            onSuccess={() => handleAuthSuccess('local_host')}
            onCancel={() => setCurrentScreen('login')}
          />
        );

      case 'home':
        return (
          <HomeScreen
            currentUser={currentUser}
            onNavigateSearch={() => setCurrentScreen('village_list')}
            onNavigateVillageDetail={(v) => {
              setSelectedVillage(v);
              setCurrentScreen('village_detail');
            }}
            onNavigateTranslator={() => setCurrentScreen('translator')}
            onNavigateMap={() => setCurrentScreen('map')}
            onNavigateGrab={() => setCurrentScreen('grab')}
            onNavigateLocalGuide={() => setCurrentScreen('local_guide')}
          />
        );

      case 'village_list':
        return (
          <SearchResultsScreen
            onSelectVillage={(v) => {
              setSelectedVillage(v);
              setCurrentScreen('village_detail');
            }}
            onBack={() => {
              setCurrentScreen(getRoleHome(currentRole));
              if (currentRole === 'nomad_user') setActiveBottomTab('home');
            }}
          />
        );

      case 'village_detail':
        return (
          <VillageDetailScreen
            village={selectedVillage}
            onBack={() => setCurrentScreen('village_list')}
            onExploreProperty={(p) => {
              setSelectedProperty(p);
              setCurrentScreen('room_options');
            }}
          />
        );

      case 'room_options':
        return (
          <RoomOptionsScreen
            village={selectedVillage}
            onBack={() => setCurrentScreen('village_detail')}
            onBookRoom={(data) => {
              setSelectedBookingCheckoutData({
                propertyId: data.room.id,
                title: data.room.title,
                image: data.room.image || data.room.images?.[0] || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
                location: data.room.villageName || selectedVillage.name || 'Làng Nghề Đà Nẵng',
                villageName: data.room.villageName || selectedVillage.name,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                nightsCount: data.nights,
                guestsCount: data.guests,
                pricePerNight: data.room.price || data.room.pricing?.nightlyVND || '850.000 VNĐ'
              });
              setCurrentScreen('booking_checkout');
            }}
          />
        );

      case 'property_detail':
        return (
          <PropertyDetailScreen
            property={selectedProperty}
            onBack={() => setCurrentScreen('village_detail')}
            onBookNow={(p) => {
              setSelectedProperty(p);
              setSelectedBookingCheckoutData({
                propertyId: p.id,
                title: p.title,
                image: p.images[0] || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
                location: p.location,
                villageName: p.villageName,
                checkIn: '12/11/2026',
                checkOut: '15/11/2026',
                nightsCount: 3,
                guestsCount: 1,
                pricePerNight: p.pricePerNight
              });
              setCurrentScreen('booking_checkout');
            }}
          />
        );

      case 'booking_checkout':
      case 'booking_summary':
        return (
          <BookingCheckoutScreen
            bookingData={selectedBookingCheckoutData}
            currentUser={currentUser}
            onBack={() => setCurrentScreen('room_options')}
            onConfirmSuccess={() => {
              setCurrentScreen('my_bookings');
            }}
          />
        );

      case 'my_bookings':
      case 'bookings':
        return (
          <MyBookingsScreen
            onBack={() => {
              setCurrentScreen('account');
              setActiveBottomTab('account');
            }}
            onExplore={() => {
              setCurrentScreen('home');
              setActiveBottomTab('home');
            }}
          />
        );

      case 'translator':
        return (
          <TranslatorScreen
            role={currentRole}
            userMode={currentRole === 'local_host' ? 'host' : 'guest'}
            onBack={() => {
              const home = getRoleHome(currentRole);
              setCurrentScreen(home);
              if (currentRole === 'local_host') setActiveBottomTab('dashboard');
              else setActiveBottomTab('home');
            }}
          />
        );

      case 'map':
        return <MapScreen onBack={() => setCurrentScreen(getRoleHome(currentRole))} />;

      case 'grab':
        return (
          <GrabServicesScreen
            onBack={() => {
              setCurrentScreen('home');
              setActiveBottomTab('home');
            }}
          />
        );

      case 'local_services':
        return (
          <LocalServicesScreen
            onBack={() => {
              setCurrentScreen(getRoleHome(currentRole));
              if (currentRole === 'nomad_user') setActiveBottomTab('home');
              else if (currentRole === 'local_host') setActiveBottomTab('dashboard');
            }}
            onOpenGrab={() => setCurrentScreen('grab')}
          />
        );

      case 'local_guide':
        return (
          <LocalGuideScreen
            onBack={() => setCurrentScreen(getRoleHome(currentRole))}
            onOpenMap={() => setCurrentScreen('map')}
          />
        );

      case 'chat':
        if (currentRole === 'local_host') {
          return (
            <HostChatScreen
              onBack={() => {
                setCurrentScreen('host_dashboard');
                setActiveBottomTab('dashboard');
              }}
            />
          );
        }
        return (
          <ChatListScreen
            onBack={() => {
              setCurrentScreen('home');
              setActiveBottomTab('home');
            }}
            onNavigateHome={() => {
              setCurrentScreen('home');
              setActiveBottomTab('home');
            }}
          />
        );

      case 'host_dashboard':
        return (
          <HostDashboardScreen
            currentUser={currentUser}
            onNavigateHome={() => setCurrentScreen('host_dashboard')}
            onNavigateAddRoom={() => {
              setCurrentScreen('add_room');
              setActiveBottomTab('add_room');
            }}
          />
        );

      case 'add_room':
        return (
          <AddRoomScreen
            onBack={() => {
              setCurrentScreen('host_dashboard');
              setActiveBottomTab('dashboard');
            }}
            onPublishSuccess={(newRoomData) => {
              console.log('New Room Listing Created:', newRoomData);
              setCurrentScreen('host_dashboard');
              setActiveBottomTab('dashboard');
            }}
          />
        );

      case 'host_listings':
        return (
          <HostListingsScreen
            currentUser={currentUser}
            onBack={() => setCurrentScreen('account')}
            onNavigateAddRoom={() => {
              setCurrentScreen('add_room');
              setActiveBottomTab('add_room');
            }}
          />
        );

      case 'host_reservations':
        return (
          <HostReservationsScreen
            currentUser={currentUser}
            onBack={() => setCurrentScreen('account')}
            onNavigateChat={(guestName) => {
              setCurrentScreen('chat');
              setActiveBottomTab('chat');
            }}
          />
        );

      case 'host_revenue':
        return (
          <HostRevenueScreen
            currentUser={currentUser}
            onBack={() => setCurrentScreen('account')}
          />
        );

      case 'account':
        return (
          <AccountScreen
            currentUser={currentUser}
            initialMode={currentRole === 'local_host' ? 'host' : 'guest'}
            onModeChange={(newMode) => {
              const newRole: UserRole = newMode === 'host' ? 'local_host' : 'nomad_user';
              setCurrentRole(newRole);
              const updatedUser: CurrentUserProfile = {
                ...currentUser,
                role: newRole,
                badge: newRole === 'local_host' ? 'Superhost' : 'Premium Nomad'
              };
              setCurrentUser(updatedUser);
              saveCurrentUserToStorage(updatedUser);
            }}
            onLogout={() => setCurrentScreen('login')}
            onNavigateMyBookings={() => setCurrentScreen('my_bookings')}
            onNavigateHostDashboard={() => {
              setCurrentScreen('host_dashboard');
              setActiveBottomTab('dashboard');
            }}
            onNavigateHostListings={() => {
              setCurrentScreen('host_listings');
            }}
            onNavigateAddRoom={() => {
              setCurrentScreen('add_room');
              setActiveBottomTab('add_room');
            }}
            onNavigateHostReservations={() => {
              setCurrentScreen('host_reservations');
            }}
            onNavigateHostRevenue={() => {
              setCurrentScreen('host_revenue');
            }}
            onNavigateHostEarnings={() => {
              setCurrentScreen('host_revenue');
            }}
          />
        );

      default:
        return (
          <HomeScreen
            currentUser={currentUser}
            onNavigateSearch={() => setCurrentScreen('village_list')}
            onNavigateVillageDetail={(v) => {
              setSelectedVillage(v);
              setCurrentScreen('village_detail');
            }}
            onNavigateTranslator={() => setCurrentScreen('translator')}
            onNavigateMap={() => setCurrentScreen('map')}
            onNavigateGrab={() => setCurrentScreen('grab')}
            onNavigateLocalGuide={() => setCurrentScreen('local_guide')}
          />
        );
    }
  };

  const showHeaderAndBottomNav = ![
    'splash',
    'login',
    'guest_register',
    'host_register',
    'booking_checkout',
    'booking_summary'
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#001710] font-sans relative selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Main Screen Header */}
      {showHeaderAndBottomNav && (
        <Header
          currentUser={currentUser}
          onNavigateHome={() => {
            const home = getRoleHome(currentRole);
            setCurrentScreen(home);
            if (currentRole === 'local_host') setActiveBottomTab('dashboard');
            else setActiveBottomTab('home');
          }}
          onOpenNotifications={() => alert('Notification: 1 new workshop booking request at Nam O Fish Sauce Village')}
        />
      )}

      {/* Current Screen Render */}
      {renderScreen()}

      {/* Role-Aware Persistent Bottom Navigation */}
      {showHeaderAndBottomNav && (
        currentRole === 'local_host' ? (
          <HostBottomNav
            activeTab={(activeBottomTab as any) || 'dashboard'}
            onTabChange={handleHostTabChange}
          />
        ) : (
          <GuestBottomNav
            activeTab={(activeBottomTab as any) || 'home'}
            onTabChange={handleGuestTabChange}
          />
        )
      )}
    </div>
  );
}
