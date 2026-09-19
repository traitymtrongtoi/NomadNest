import React from 'react';
import { SplashScreen, HeroWelcomeCarousel as CarouselComponent, SplashScreenProps } from '../screens/SplashScreen';

export interface HeroWelcomeCarouselProps extends SplashScreenProps {}

export const HeroWelcomeCarousel: React.FC<HeroWelcomeCarouselProps> = (props) => {
  return <CarouselComponent {...props} />;
};

export default HeroWelcomeCarousel;
