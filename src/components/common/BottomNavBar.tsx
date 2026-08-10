import React from 'react';
import { GuestBottomNav } from './GuestBottomNav';
import { HostBottomNav } from './HostBottomNav';

export { GuestBottomNav, HostBottomNav };

interface BottomNavBarProps {
  activeTab: 'home' | 'services' | 'chat' | 'account';
  onTabChange: (tab: 'home' | 'services' | 'chat' | 'account') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = (props) => {
  return <GuestBottomNav {...props} />;
};

