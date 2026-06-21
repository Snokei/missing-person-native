/* eslint-disable import/no-duplicates */
import 'react-native-gesture-handler';

import { BLUE_BG, PURPLE_BG, TEAL_BG } from 'components/core/const';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DrawerHamburgerHeader } from '../components/UI/DrawerHamburgerHeader';
import { CustomDrawerContent } from '../components/UI/CustomDrawer';
import { NotificationBell, NotificationProvider } from '../components/UI/NotificationPanel';
import '../global.css';
import '../tasks/locationTask';

const hiddenDrawerScreen = {
  drawerItemStyle: { display: 'none' as const },
  headerShown: false,
  swipeEnabled: false,
};

function defaultHeaderLeft() {
  return <DrawerHamburgerHeader />;
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationProvider>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: '#111827',
            fontWeight: '700',
          },
          headerTintColor: '#0DB893',
          drawerActiveTintColor: '#0DB893',
          drawerInactiveTintColor: '#6B7280',
          drawerActiveBackgroundColor: '#E8F8F4',
        }}>
        <Drawer.Screen name="index" options={hiddenDrawerScreen} />
        <Drawer.Screen name="auth/login" options={hiddenDrawerScreen} />
        <Drawer.Screen name="auth/register" options={hiddenDrawerScreen} />
        <Drawer.Screen
          name="home"
          options={{
            title: '',
            drawerLabel: 'Dashboard',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerLeft: defaultHeaderLeft,
            headerRight: () => <NotificationBell />,
          }}
        />
        <Drawer.Screen
          name="location"
          options={{
            title: '',
            drawerLabel: 'Location',
            headerStyle: { backgroundColor: BLUE_BG },
            headerLeft: defaultHeaderLeft,
            headerRight: () => <NotificationBell />,
          }}
        />
        <Drawer.Screen
          name="missing"
          options={{
            title: '',
            drawerLabel: 'Missing',
            headerStyle: { backgroundColor: TEAL_BG },
            headerLeft: defaultHeaderLeft,
            headerRight: () => <NotificationBell />,
          }}
        />
        <Drawer.Screen
          name="missing-list"
          options={{
            title: '',
            drawerLabel: 'Missing List',
            headerStyle: { backgroundColor: PURPLE_BG },
            headerLeft: defaultHeaderLeft,
            headerRight: () => <NotificationBell />,
          }}
        />
      </Drawer>
      </NotificationProvider>
    </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
