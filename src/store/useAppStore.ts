import { create } from 'zustand';

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
  setLoginUser: (user: any) => void;
  // Partial allows you to pass only the fields you want to update
  setShowAlert: (alertData: Partial<AlertConfig>) => void;
}

// 2. Pass the interface to create<AppState>()
export const useAppStore = create<AppState>((set) => ({
  // Initial State
  userInfo: null,
  showAlert: {
    title: '',
    message: '',
    type: 'info',
    visible: false,
  },

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
}));
