import { createContext, useContext, type ReactNode } from 'react';
import { useLocationTracking } from 'hooks/useLocationTracking';
import type { LocationSnapshot } from 'tasks/locationTask';

interface LocationContextValue {
  savedLocation: LocationSnapshot | null;
  trackingEnabled: boolean;
  isExpoGo: boolean;
  copyLocation: (label: string, value: number) => Promise<void>;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const { copyLocation, savedLocation, trackingEnabled, isExpoGo } =
    useLocationTracking();

  return (
    <LocationContext.Provider
      value={{ copyLocation, savedLocation, trackingEnabled, isExpoGo }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error('useLocationContext must be used within a <LocationProvider>');
  }
  return ctx;
}