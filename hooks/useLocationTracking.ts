import Constants from 'expo-constants';
import { useEffect, useRef, useState } from 'react';
import { Alert, AppState, Linking, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Location from 'expo-location';
import {
  LOCATION_TASK_NAME,
  type LocationSnapshot,
  getSavedLocation,
  saveLocation,
} from '../tasks/locationTask';

const isExpoGo = Constants.executionEnvironment === 'storeClient';

export function useLocationTracking() {
  const [savedLocation, setSavedLocation] = useState<LocationSnapshot | null>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let hasLocation = false;

    const hydrateLocation = async () => {
      const storedLocation = await getSavedLocation();

      if (!cancelled && storedLocation) {
        setSavedLocation(storedLocation);
        hasLocation = true;
      }
    };

    const captureCurrentLocation = async () => {
      const foreground = await Location.getForegroundPermissionsAsync();

      if (!foreground.granted) {
        const requestedForeground = await Location.requestForegroundPermissionsAsync();

        if (!requestedForeground.granted) {
          if (!hasLocation) {
            Alert.alert(
              'Location permission needed',
              'Please allow location access so the app can read GPS coordinates.'
            );
          }

          return;
        }
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (!cancelled) {
        const snapshot = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          timestamp: currentLocation.timestamp,
        };

        setSavedLocation(snapshot);
        await saveLocation(snapshot);
      }

      hasLocation = true;
    };

    const syncTrackingState = async () => {
      if (isExpoGo) {
        if (!cancelled) {
          setTrackingEnabled(false);
        }
        return;
      }

      const started = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

      if (!cancelled) {
        setTrackingEnabled(started);
      }
    };

    const startBackgroundTracking = async () => {
      if (isExpoGo) {
        return;
      }

      const background = await Location.getBackgroundPermissionsAsync();

      if (!background.granted) {
        const requestedBackground = await Location.requestBackgroundPermissionsAsync();

        if (!requestedBackground.granted) {
          Alert.alert(
            'Background tracking off',
            'Foreground location still works. Allow background location in Settings if you want tracking while the app is closed.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  void Linking.openSettings();
                },
              },
              { text: 'OK', style: 'cancel' },
            ]
          );
          return;
        }
      }

      const alreadyStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

      if (alreadyStarted) {
        if (!cancelled) {
          setTrackingEnabled(true);
        }
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 60_000,
        distanceInterval: 0,
        deferredUpdatesInterval: 60_000,
        showsBackgroundLocationIndicator: true,
        ...(Platform.OS === 'android'
          ? {
              foregroundService: {
                notificationTitle: 'GPS tracking active',
                notificationBody: 'Your location is being updated in the background.',
                killServiceOnDestroy: false,
              },
            }
          : {}),
      });

      if (!cancelled) {
        setTrackingEnabled(true);
      }
    };

    const ensureLocationAccessAndTracking = async () => {
      try {
        await captureCurrentLocation();
        await startBackgroundTracking();
      } catch (error) {
        console.warn('Location tracking failed:', error);

        if (!hasLocation) {
          Alert.alert(
            'Location unavailable',
            isExpoGo
              ? 'Could not read your location. Background tracking needs a development build, but foreground GPS should still work in Expo Go.'
              : 'We could not read or update your location right now. Please try again after checking permissions.'
          );
        }
      }
    };

    const initializeLocationFlow = async () => {
      if (bootstrappedRef.current || cancelled) {
        return;
      }

      bootstrappedRef.current = true;

      try {
        await hydrateLocation();
        await syncTrackingState();
        await ensureLocationAccessAndTracking();
      } catch (error) {
        console.warn('Location initialization failed:', error);

        Alert.alert(
          'Location unavailable',
          'We could not read your location right now. Please try again after checking permissions.'
        );
      } finally {
        bootstrappedRef.current = false;
      }
    };

    void initializeLocationFlow();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        void initializeLocationFlow();
      }
    });

    const refreshTimer = setInterval(() => {
      void captureCurrentLocation();
    }, 60_000);

    return () => {
      cancelled = true;
      subscription.remove();
      clearInterval(refreshTimer);
    };
  }, []);

  const copyLocation = async (label: string, value: number) => {
    await Clipboard.setStringAsync(String(value));
    Alert.alert('Copied', `${label} copied to clipboard.`);
  };

  return {
    copyLocation,
    savedLocation,
    trackingEnabled,
    isExpoGo,
  };
}
