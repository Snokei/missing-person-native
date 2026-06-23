import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

function StackBackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push('/SettingsScreen')}
      style={{ padding: 5, marginLeft: 0 }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
      <Ionicons name="arrow-back" size={24} color="#111827" />
    </TouchableOpacity>
  );
}

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerShadowVisible: false,
        headerTintColor: '#0DB893',
        headerTitleStyle: { color: '#111827', fontWeight: '700', fontSize: 17 },
        headerLeft: () => <StackBackButton />,
      }}>
      <Stack.Screen name="profile" options={{ title: 'Manage Profile' }} />
      <Stack.Screen name="security" options={{ title: 'Password & Security' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="emergency-contacts" options={{ title: 'Emergency Contacts' }} />
    </Stack>
  );
}
