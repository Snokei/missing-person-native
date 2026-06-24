import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensureNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert(
      'Notification permission needed',
      'Please allow notifications so the app can send you alerts about missing persons.'
    );
    return false;
  }

  return true;
}

export async function registerForPushNotifications(): Promise<string | undefined> {
  const granted = await ensureNotificationPermissions();

  if (!granted) {
    return;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

  if (!projectId) {
    console.log('Expo push token requires eas.projectId in app.json extra.eas');
    return;
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log('Expo Push Token =>', token.data);
    return token.data;
  } catch (error) {
    console.log('Push notification error =>', error);
  }
}
