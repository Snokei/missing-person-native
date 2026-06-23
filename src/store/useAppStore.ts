import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Extracting the alert type makes it easier to reference
export interface AlertConfig {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

// 1. Define the shape of your state and actions
interface AppState {
  userInfo: any;
  showAlert: AlertConfig;
  isDarkMode: boolean;
  isBiometricsEnabled: boolean;
  setLoginUser: (user: any) => void;
  // Partial allows you to pass only the fields you want to update
  setShowAlert: (alertData: Partial<AlertConfig>) => void;
  toggleTheme: () => void;
  setBiometrics: (enabled: boolean) => void;
  logoutUser: () => void;
}

// 2. Pass the interface to create<AppState>()
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial States
      userInfo: {
        firstName: 'Sarah',
        lastName: 'Jenkins',
        email: 'sarah.j@enterprise.io',
        phone: '+1 (555) 019-2834',
        role: 'Principal Platform Engineer',
        status: 'Active',
        createdDate: 'January 14, 2024',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      },
      showAlert: {
        title: '',
        message: '',
        type: 'info',
        visible: false,
      },
      isDarkMode: false,
      isBiometricsEnabled: false,

      // Actions
      setLoginUser: (user) => set({ userInfo: user }),
      // Use the previous state to merge the old alert data with the new incoming data
      setShowAlert: (alertData) =>
        set((state) => ({
          showAlert: {
            ...state.showAlert,
            ...alertData,
          },
        })),
      toggleTheme: () =>
        set((state) => {
          const nextTheme = !state.isDarkMode;
          return { isDarkMode: nextTheme };
        }),
      setBiometrics: (enabled) => set({ isBiometricsEnabled: enabled }),
      logoutUser: () => set({ userInfo: null, isBiometricsEnabled: false }),
    }),
    {
      name: 'app-global-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        isBiometricsEnabled: state.isBiometricsEnabled,
      }),
    }
  )
);