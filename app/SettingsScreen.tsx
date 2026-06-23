import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import * as LocalAuthentication from 'expo-local-authentication';
import { useColorScheme as useTailwindColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// ==========================================
// 1. ZUSTAND GLOBAL STATE MANAGEMENT
// ==========================================

export interface AlertConfig {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

interface AppState {
  userInfo: any;
  showAlert: AlertConfig;
  isDarkMode: boolean;
  isBiometricsEnabled: boolean;
  setLoginUser: (user: any) => void;
  setShowAlert: (alertData: Partial<AlertConfig>) => void;
  toggleTheme: () => void;
  setBiometrics: (enabled: boolean) => void;
  logoutUser: () => void;
}

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
      setShowAlert: (alertData) =>
        set((state) => ({
          showAlert: { ...state.showAlert, ...alertData },
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

// ==========================================
// 2. REUSABLE COMPONENT: SETTINGS ITEM ROW
// ==========================================

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  type?: 'navigate' | 'switch' | 'value';
  value?: string;
  switchValue?: boolean;
  onSwitchChange?: (val: boolean) => void;
  onPress?: () => void;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  type = 'navigate',
  value,
  switchValue,
  onSwitchChange,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={type !== 'navigate'}
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4 dark:border-slate-700/50">
      <View className="flex-1 flex-row items-center pr-4">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40">
          <Ionicons name={icon} size={18} className="text-indigo-600 dark:text-indigo-400" />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-semibold text-gray-900 dark:text-slate-100">
            {title}
          </Text>
          {subtitle && (
            <Text className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">{subtitle}</Text>
          )}
        </View>
      </View>

      {type === 'navigate' && (
        <Ionicons name="chevron-forward" size={16} className="text-gray-400 dark:text-slate-500" />
      )}
      {type === 'value' && (
        <Text className="text-sm font-medium text-gray-500 dark:text-slate-400">{value}</Text>
      )}
      {type === 'switch' && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E2E8F0', true: '#4F46E5' }}
          thumbColor="#FFFFFF"
        />
      )}
    </TouchableOpacity>
  );
};

// ==========================================
// 3. MAIN DASHBOARD SCREEN
// ==========================================

export default function SettingsScreen() {
  const router = useRouter();
  const { userInfo, isDarkMode, toggleTheme, isBiometricsEnabled, setBiometrics, logoutUser } =
    useAppStore();
  const { setColorScheme } = useTailwindColorScheme();
  const [bioSupported, setBioSupported] = useState(false);
  const [appVersion, setAppVersion] = useState('1.0.0 (1)');

  useEffect(() => {
    setColorScheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    async function checkSystem() {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBioSupported(compatible && enrolled);

      if (Application.nativeApplicationVersion) {
        setAppVersion(
          `Version ${Application.nativeApplicationVersion} (${Application.nativeBuildVersion || '1'})`
        );
      }
    }
    checkSystem();
  }, []);

  const handleBioToggle = async () => {
    if (!bioSupported) {
      Alert.alert('Unsupported', 'Biometrics enrollment missing or device hardware unsupported.');
      return;
    }
    if (!isBiometricsEnabled) {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirm Identity',
      });
      if (auth.success) setBiometrics(true);
    } else {
      setBiometrics(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to exit your active session?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          logoutUser();
          router.replace('/auth/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center rounded-b-[28px] bg-gradient-to-br from-indigo-600 to-violet-600 px-6 pb-8 pt-10">
          <Image
            source={{ uri: userInfo?.avatar }}
            className="h-16 w-16 rounded-full border-2 border-white"
          />
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-white">
              {userInfo?.firstName} {userInfo?.lastName}
            </Text>
            <Text className="mt-0.5 text-sm text-indigo-100">{userInfo?.email}</Text>
          </View>
        </View>

        <View className="space-y-6 p-4">
          <View>
            <Text className="mb-2 ml-2 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">
              ACCOUNT
            </Text>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
              <SettingsItem
                icon="person-circle-outline"
                title="Manage Profile"
                subtitle="Your profile and portfolio details"
                onPress={() => router.push('/settings/profile')}
              />
              <SettingsItem
                icon="shield-checkmark-outline"
                title="Password & Security"
                subtitle="Update account validation phrases"
                onPress={() => router.push('/settings/security')}
              />
              <SettingsItem
                icon="finger-print-outline"
                title="Biometric Security"
                type="switch"
                switchValue={isBiometricsEnabled}
                onSwitchChange={handleBioToggle}
              />
            </View>
          </View>

          <View>
            <Text className="mb-2 ml-2 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">
              PREFERENCES
            </Text>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
              <SettingsItem
                icon="moon-outline"
                title="Dark Interface Theme"
                type="switch"
                switchValue={isDarkMode}
                onSwitchChange={toggleTheme}
              />
              <SettingsItem
                icon="information-circle-outline"
                title="About Corporate"
                onPress={() => router.push('/settings/about')}
              />
            </View>
          </View>

          <View>
            <Text className="mb-2 ml-2 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">
              SUPPORT
            </Text>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
              <SettingsItem
                icon="call-outline"
                title="Emergency Contacts"
                onPress={() => router.push('/settings/emergency-contacts')}
              />
            </View>
          </View>

          <View>
            <Text className="mb-2 ml-2 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">
              APPLICATION
            </Text>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
              <SettingsItem
                icon="phone-portrait-outline"
                title="App Version"
                type="value"
                value={appVersion}
              />
              <SettingsItem icon="log-out-outline" title="Sign Out of App" onPress={handleLogout} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 4. READ-ONLY PROFILE SCREEN
// ==========================================

export function ProfileScreen() {
  const { userInfo } = useAppStore();

  const Row = ({ label, value }: { label: string; value: string }) => (
    <View className="border-b border-gray-100 py-4 dark:border-slate-700/50">
      <Text className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
        {label}
      </Text>
      <Text className="text-[16px] font-medium text-gray-900 dark:text-slate-100">{value}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <View className="mb-6 mt-4 items-center">
          <Image
            source={{ uri: userInfo?.avatar }}
            className="mb-3 h-28 w-28 rounded-full shadow"
          />
          <View className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 dark:border-emerald-800 dark:bg-emerald-950/40">
            <Text className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              {userInfo?.status}
            </Text>
          </View>
        </View>

        <View className="rounded-2xl border border-gray-100 bg-white px-5 py-2 shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
          <Row label="First Name" value={userInfo?.firstName} />
          <Row label="Last Name" value={userInfo?.lastName} />
          <Row label="Email Address" value={userInfo?.email} />
          <Row label="Phone Number" value={userInfo?.phone} />
          <Row label="System Role" value={userInfo?.role} />
          <Row label="Account Created" value={userInfo?.createdDate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 5. VALIDATED CHANGED-PASSWORD FORM
// ==========================================

export function SecurityScreen() {
  const router = useRouter();
  const { setShowAlert } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState({ old: true, next: true, conf: true });
  const [form, setForm] = useState({ old: '', next: '', conf: '' });

  const handleUpdate = async () => {
    if (!form.old || !form.next || !form.conf) {
      Alert.alert('Error', 'Please complete all password fields.');
      return;
    }
    if (form.next !== form.conf) {
      Alert.alert('Error', 'Your core confirmation input does not match.');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowAlert({
        title: 'Security Match',
        message: 'Credentials Updated',
        type: 'success',
        visible: true,
      });
      Alert.alert('Success', 'Password saved securely.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert('Error', 'Upstream gateway error processing updates.');
    } finally {
      setLoading(false);
    }
  };

  // Change the function definition to this:
  const InputField = (label: string, target: 'old' | 'next' | 'conf') => (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-gray-600 dark:text-slate-400">{label}</Text>
      <View className="h-12 flex-row items-center rounded-xl border border-gray-200 bg-white px-4 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800">
        <TextInput
          secureTextEntry={secure[target]}
          value={form[target]}
          onChangeText={(t) => setForm({ ...form, [target]: t })}
          className="h-full flex-1 text-[15px] text-gray-900 dark:text-slate-100"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setSecure({ ...secure, [target]: !secure[target] })}>
          <Ionicons name={secure[target] ? 'eye-off' : 'eye'} size={18} className="text-gray-400" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <KeyboardAwareScrollView contentContainerStyle={{ padding: 24 }} enableOnAndroid>
        <Text className="mb-1 text-2xl font-bold text-gray-900 dark:text-slate-100">
          Security Settings
        </Text>
        <Text className="mb-8 text-sm text-gray-500 dark:text-slate-400">
          Maintain secure encryption configurations across authorization layers.
        </Text>

        {InputField('Current Password', 'old')}
        {InputField('New Password', 'next')}
        {InputField('Confirm New Password', 'conf')}

        <TouchableOpacity
          onPress={handleUpdate}
          disabled={loading}
          className={`mt-4 h-12 items-center justify-center rounded-xl bg-indigo-600 ${loading ? 'opacity-60' : ''}`}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-[15px] font-bold text-white">Update Credentials</Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 6. RICH CORPORATE SHOWCASE ABOUT SCREEN
// ==========================================

export function AboutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
        <View className="my-8 items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
            <Ionicons name="rocket" size={38} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100">
            Enterprise Nexus
          </Text>
          <Text className="mt-1 text-sm font-medium text-gray-500 dark:text-slate-400">
            Empowering Global Architecture
          </Text>
        </View>

        <View className="mb-6 w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
          <Text className="mb-2 text-base font-bold text-gray-900 dark:text-slate-100">
            Our Corporate Mission
          </Text>
          <Text className="mb-5 text-sm leading-6 text-gray-600 dark:text-slate-400">
            To platform microservices dynamically using unified mobile telemetry patterns, ensuring
            secure high concurrency sync.
          </Text>
          <Text className="mb-2 text-base font-bold text-gray-900 dark:text-slate-100">
            Integrated Infrastructure
          </Text>
          <Text className="text-sm leading-6 text-gray-600 dark:text-slate-400">
            • End-to-end edge encryption security wrappers.{'\n'}• Biometric verification modules.
            {'\n'}• Multi-tenant theme integration adapters.
          </Text>
        </View>

        <View className="mb-8 w-full flex-row justify-between">
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:support@nexus.io')}
            className="mr-2 h-12 flex-1 flex-row items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <Ionicons name="mail" size={18} className="text-indigo-600 dark:text-indigo-400" />
            <Text className="ml-2 text-sm font-semibold text-gray-900 dark:text-slate-100">
              Email Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://google.com')}
            className="ml-2 h-12 flex-1 flex-row items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <Ionicons name="earth" size={18} className="text-indigo-600 dark:text-indigo-400" />
            <Text className="ml-2 text-sm font-semibold text-gray-900 dark:text-slate-100">
              Visit Nexus
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-4 text-xs text-gray-400 dark:text-slate-500">
          © 2026 Enterprise Nexus Inc. All Rights Reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 7. PERSISTENT EMERGENCY CONTACT MANAGER
// ==========================================

interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export function EmergencyContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState({ name: '', rel: '', phone: '' });

  useEffect(() => {
    async function load() {
      const stored = await AsyncStorage.getItem('@app_emergency_contacts');
      if (stored) setContacts(JSON.parse(stored));
    }
    load();
  }, []);

  const sync = async (list: Contact[]) => {
    setContacts(list);
    await AsyncStorage.setItem('@app_emergency_contacts', JSON.stringify(list));
  };

  const handleAdd = () => {
    if (!form.name || !form.rel || !form.phone) {
      Alert.alert('Error', 'Please populate all entry text forms.');
      return;
    }
    const cleanNumber = form.phone.replace(/[^0-9+]/g, '');

    const item: Contact = {
      id: Date.now().toString(),
      name: form.name,
      relationship: form.rel,
      phone: cleanNumber,
      isPrimary: contacts.length === 0,
    };

    sync([...contacts, item]);
    setForm({ name: '', rel: '', phone: '' });
  };

  const handleDelete = (id: string) => {
    const list = contacts.filter((c) => c.id !== id);
    if (contacts.find((c) => c.id === id)?.isPrimary && list.length > 0) {
      list[0].isPrimary = true;
    }
    sync(list);
  };

  const togglePrimary = (id: string) => {
    sync(contacts.map((c) => ({ ...c, isPrimary: c.id === id })));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <Text className="mb-3 ml-1 text-base font-bold text-gray-900 dark:text-slate-100">
          Add Contact
        </Text>
        <View className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <TextInput
            placeholder="Full Name"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
            className="mb-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            placeholder="Relationship"
            value={form.rel}
            onChangeText={(t) => setForm({ ...form, rel: t })}
            className="mb-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            placeholder="Phone String"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(t) => setForm({ ...form, phone: t })}
            className="mb-4 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity
            onPress={handleAdd}
            className="h-11 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
            <Text className="text-sm font-bold text-white">Save Contact Node</Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-3 ml-1 text-base font-bold text-gray-900 dark:text-slate-100">
          Saved Entities ({contacts.length})
        </Text>
        {contacts.map((item) => (
          <View
            key={item.id}
            className={`shadow-xs mb-3 flex-row items-center justify-between rounded-2xl border bg-white p-4 dark:bg-slate-800 ${item.isPrimary ? 'border-indigo-500' : 'border-gray-100 dark:border-slate-700'}`}>
            <View className="flex-1 pr-2">
              <View className="mb-1 flex-row items-center">
                <Text className="text-base font-bold text-gray-900 dark:text-slate-100">
                  {item.name}
                </Text>
                {item.isPrimary && (
                  <View className="ml-2 rounded bg-indigo-600 px-2 py-0.5">
                    <Text className="text-[9px] font-black text-white">PRIMARY</Text>
                  </View>
                )}
              </View>
              <Text className="text-xs font-medium text-gray-500 dark:text-slate-400">
                {item.relationship} • {item.phone}
              </Text>
            </View>

            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
                className="h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                <Ionicons
                  name="call"
                  size={15}
                  className="text-emerald-600 dark:text-emerald-400"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`sms:${item.phone}`)}
                className="h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
                <Ionicons
                  name="chatbubble"
                  size={15}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </TouchableOpacity>
              {!item.isPrimary && (
                <TouchableOpacity
                  onPress={() => togglePrimary(item.id)}
                  className="h-8 w-8 items-center justify-center rounded-lg bg-gray-50 dark:bg-slate-700">
                  <Ionicons name="star" size={15} className="text-gray-400" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                className="h-8 w-8 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/50">
                <Ionicons name="trash" size={15} className="text-rose-600 dark:text-rose-400" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
