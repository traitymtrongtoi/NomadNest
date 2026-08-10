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
import { TranslatorScreen } from './components/screens/TranslatorScreen';
import { MapScreen } from './components/screens/MapScreen';
import { GrabServicesScreen } from './components/screens/GrabServicesScreen';
import { LocalServicesScreen } from './components/screens/LocalServicesScreen';
import { LocalGuideScreen } from './components/screens/LocalGuideScreen';
import { ChatListScreen } from './components/screens/ChatListScreen';
import { HostChatScreen } from './components/screens/HostChatScreen';
import { HostDashboardScreen } from './components/screens/HostDashboardScreen';
import { AdminDashboardScreen } from './components/screens/AdminDashboardScreen';
import { AccountScreen } from './components/screens/AccountScreen';

// Common UI
import { Header } from './components/common/Header';
import { GuestBottomNav } from './components/common/GuestBottomNav';
import { HostBottomNav } from './components/common/HostBottomNav';

import { saveCurrentUserToStorage } from './utils/userStorage';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('nomad_user');
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [selectedVillage, setSelectedVillage] = useState<Village>(MOCK_VILLAGES[0]);
  const [selectedProperty, setSelectedProperty] = useState<Property>(MOCK_PROPERTIES[0]);
  const [activeBottomTab, setActiveBottomTab] = useState<string>('home');

  const currentUser = MOCK_USERS[currentRole] || MOCK_USERS.nomad_user;

  // Sync current user to localStorage whenever role changes
  React.useEffect(() => {
    saveCurrentUserToStorage({
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar,
      role: currentUser.role,
      badge: currentUser.badge
    });
  }, [currentRole, currentUser]);

  // Helper to get role home screen
  const getRoleHome = (role: UserRole) => {
    if (role === 'local_host') return 'host_dashboard';
    if (role === 'admin') return 'admin_dashboard';
    return 'home';
  };

  // Handle Quick Role Login
  const handleQuickRoleLogin = (role: UserRole) => {
    setCurrentRole(role);
    const userToSave = MOCK_USERS[role] || MOCK_USERS.nomad_user;
    saveCurrentUserToStorage({
      id: userToSave.id,
      name: userToSave.name,
      email: userToSave.email,
      avatar: userToSave.avatar,
      role: userToSave.role,
      badge: userToSave.badge
    });
    if (role === 'local_host') {
      setCurrentScreen('host_dashboard');
      setActiveBottomTab('dashboard');
    } else if (role === 'admin') {
      setCurrentScreen('admin_dashboard');
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
  const handleHostTabChange = (tab: 'dashboard' | 'add_room' | 'chat' | 'account') => {
    setActiveBottomTab(tab);
    if (tab === 'dashboard') setCurrentScreen('host_dashboard');
    else if (tab === 'add_room') setCurrentScreen('add_room');
    else if (tab === 'chat') setCurrentScreen('chat');
    else if (tab === 'account') setCurrentScreen('account');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onExplore={() => setCurrentScreen('login')}
            onSkip={() => handleQuickRoleLogin('nomad_user')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onSelectRoleLogin={handleQuickRoleLogin}
            onContinueEmail={(role) => {
              if (role === 'local_host') setCurrentScreen('host_register');
              else setCurrentScreen('guest_register');
            }}
          />
        );

      case 'guest_register':
        return (
          <GuestRegistrationScreen
            onSuccess={() => handleQuickRoleLogin('nomad_user')}
            onCancel={() => setCurrentScreen('login')}
          />
        );

      case 'host_register':
        return (
          <HostRegistrationScreen
            onSuccess={() => handleQuickRoleLogin('local_host')}
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
          />
        );

      case 'property_detail':
        return (
          <PropertyDetailScreen
            property={selectedProperty}
            onBack={() => setCurrentScreen('village_detail')}
            onBookNow={(p) => {
              setSelectedProperty(p);
              setCurrentScreen('booking_summary');
            }}
          />
        );

      case 'booking_summary':
        return (
          <BookingSummaryScreen
            property={selectedProperty}
            onConfirmBooking={() => {
              alert('Đặt phòng thành công! Chúc bạn có trải nghiệm tuyệt vời tại làng nghề.');
              setCurrentScreen(getRoleHome(currentRole));
            }}
            onCancel={() => setCurrentScreen('property_detail')}
          />
        );

      case 'translator':
        return <TranslatorScreen onBack={() => setCurrentScreen(getRoleHome(currentRole))} />;

      case 'map':
        return <MapScreen onBack={() => setCurrentScreen(getRoleHome(currentRole))} />;

      case 'grab':
        return <GrabServicesScreen onBack={() => setCurrentScreen(getRoleHome(currentRole))} />;

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

      case 'admin_dashboard':
        return (
          <AdminDashboardScreen
            currentUser={currentUser}
            onNavigateHome={() => setCurrentScreen('admin_dashboard')}
          />
        );

      case 'account':
        return (
          <AccountScreen
            currentUser={currentUser}
            onLogout={() => setCurrentScreen('login')}
            onOpenQuickRoles={() => setCurrentScreen('login')}
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

  const showHeaderAndBottomNav = !['splash', 'login', 'guest_register', 'host_register'].includes(currentScreen);

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
          onOpenNotifications={() => alert('Thông báo: 1 lịch hẹn trải nghiệm mới tại Làng Nước Mắm Nam Ô')}
          onOpenQuickRoles={() => setCurrentScreen('login')}
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
