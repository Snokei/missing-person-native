import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerShadowVisible: false,
        headerTintColor: '#0DB893',
        headerTitleStyle: { color: '#111827', fontWeight: '700' },
      }}>
      <Stack.Screen name="profile" options={{ title: 'Manage Profile' }} />
      <Stack.Screen name="security" options={{ title: 'Password & Security' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="emergency-contacts" options={{ title: 'Emergency Contacts' }} />
    </Stack>
  );
}
