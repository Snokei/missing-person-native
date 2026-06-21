import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export const LOCATION_TASK_NAME = 'background-location-tracking';
const LAST_LOCATION_KEY = 'last-gps-location';

export type LocationSnapshot = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error || !data) {
    return;
  }

  const { locations } = data as { locations?: Location.LocationObject[] };
  const latestLocation = locations?.[0];

  if (!latestLocation) {
    return;
  }

  await saveLocation({
    latitude: latestLocation.coords.latitude,
    longitude: latestLocation.coords.longitude,
    timestamp: latestLocation.timestamp,
  });
});

export async function saveLocation(location: LocationSnapshot) {
  await AsyncStorage.setItem(LAST_LOCATION_KEY, JSON.stringify(location));
}

export async function getSavedLocation(): Promise<LocationSnapshot | null> {
  const value = await AsyncStorage.getItem(LAST_LOCATION_KEY);
  return value ? (JSON.parse(value) as LocationSnapshot) : null;
}
