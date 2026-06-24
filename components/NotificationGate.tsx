import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  BackHandler,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { requestNotificationPermissions } from '../src/utils/pushNotifications';

type GateStatus = 'checking' | 'granted' | 'denied';

export function NotificationGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<GateStatus>('checking');

  const handleDenied = useCallback(() => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
      return;
    }

    setStatus('denied');
  }, []);

  const checkPermissions = useCallback(async () => {
    const granted = await requestNotificationPermissions();

    if (granted) {
      setStatus('granted');
    } else {
      handleDenied();
    }
  }, [handleDenied]);

  useEffect(() => {
    void checkPermissions();
  }, [checkPermissions]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        void checkPermissions();
      }
    });

    return () => subscription.remove();
  }, [checkPermissions]);

  if (status === 'granted') {
    return <>{children}</>;
  }

  if (status === 'denied') {
    return (
      <View style={styles.container}>
        <Ionicons name="notifications-off-outline" size={64} color="#0DB893" />
        <Text style={styles.title}>Notifications Required</Text>
        <Text style={styles.message}>
          This app needs notification permission to alert you about missing persons. Please enable
          notifications in Settings.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => void Linking.openSettings()}>
          <Text style={styles.buttonText}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0DB893" />
      <Text style={styles.waitingText}>Waiting for notification permission...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#0DB893',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  waitingText: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 8,
  },
});
