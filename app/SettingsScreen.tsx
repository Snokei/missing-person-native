import { Ionicons } from '@expo/vector-icons';
import { USER_IMAGE } from 'components/core/generalConst';
import * as Application from 'expo-application';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenTransition } from '../components/UI/ScreenTransition';
import { TEAL, TEAL_BG, TEAL_LIGHT } from '../components/core/const';
import { useAppStore } from '../src/store/useAppStore';

// ==========================================
// 1. REUSABLE COMPONENT: SETTINGS ITEM ROW
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
      style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsIconBox}>
          <Ionicons name={icon} size={18} color={TEAL} />
        </View>
        <View style={styles.settingsTextWrap}>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>

      {type === 'navigate' && <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />}
      {type === 'value' && <Text style={styles.settingsValue}>{value}</Text>}
      {type === 'switch' && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E2E8F0', true: TEAL }}
          thumbColor="#FFFFFF"
        />
      )}
    </TouchableOpacity>
  );
};

// ==========================================
// 2. MAIN SETTINGS SCREEN
// ==========================================

export default function SettingsScreen() {
  const router = useRouter();
  const { userInfo, isDarkMode, toggleTheme, isBiometricsEnabled, setBiometrics, logoutUser } =
    useAppStore();
  const [bioSupported, setBioSupported] = useState(false);
  const [appVersion, setAppVersion] = useState('1.0.0 (1)');
  const { first_name, last_name, phone } = userInfo?.user || {};

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
    <ScreenTransition>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Gradient Header */}
          <LinearGradient
            colors={['#0DB893', '#0891B2', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroHeader}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />

            <View style={styles.heroContent}>
              <View style={styles.heroRow}>
                <Image source={{ uri: userInfo?.avatar || USER_IMAGE }} style={styles.heroAvatar} />
                <View style={styles.heroTextWrap}>
                  <Text style={styles.heroName}>
                    {first_name} {last_name}
                  </Text>
                  <Text style={styles.heroEmail}>{phone}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.sectionsContainer}>
            {/* ACCOUNT Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>ACCOUNT</Text>
              <View style={styles.sectionCard}>
                <SettingsItem
                  icon="person-circle-outline"
                  title="Manage Profile"
                  subtitle="Your profile and portfolio details"
                  onPress={() => router.push('/settings/profile')}
                />
                <View style={styles.sectionDivider} />
                <SettingsItem
                  icon="shield-checkmark-outline"
                  title="Password & Security"
                  subtitle="Update account validation phrases"
                  onPress={() => router.push('/settings/security')}
                />
                <View style={styles.sectionDivider} />
                <SettingsItem
                  icon="finger-print-outline"
                  title="Biometric Security"
                  type="switch"
                  switchValue={isBiometricsEnabled}
                  onSwitchChange={handleBioToggle}
                />
              </View>
            </View>

            {/* PREFERENCES Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>PREFERENCES</Text>
              <View style={styles.sectionCard}>
                <SettingsItem
                  icon="moon-outline"
                  title="Dark Interface Theme"
                  type="switch"
                  switchValue={isDarkMode}
                  onSwitchChange={toggleTheme}
                />
                <View style={styles.sectionDivider} />
                <SettingsItem
                  icon="information-circle-outline"
                  title="About Corporate"
                  onPress={() => router.push('/settings/about')}
                />
              </View>
            </View>

            {/* SUPPORT Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>SUPPORT</Text>
              <View style={styles.sectionCard}>
                <SettingsItem
                  icon="call-outline"
                  title="Emergency Contacts"
                  onPress={() => router.push('/settings/emergency-contacts')}
                />
              </View>
            </View>

            {/* APPLICATION Section */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>APPLICATION</Text>
              <View style={styles.sectionCard}>
                <SettingsItem
                  icon="phone-portrait-outline"
                  title="App Version"
                  type="value"
                  value={appVersion}
                />
                <View style={styles.sectionDivider} />
                <SettingsItem
                  icon="log-out-outline"
                  title="Sign Out of App"
                  onPress={handleLogout}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenTransition>
  );
}

// ==========================================
// 3. STYLES
// ==========================================

const styles = StyleSheet.create({
  // --- Base ---
  safeArea: {
    flex: 1,
    backgroundColor: TEAL_BG,
  },

  // --- Hero Header ---
  heroHeader: {
    paddingTop: 20,
    paddingBottom: 6,
    paddingHorizontal: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  decorCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -60,
    right: -40,
  },
  decorCircle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -30,
    left: -20,
  },
  heroContent: {
    marginBottom: 20,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  heroTextWrap: {
    flex: 1,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  heroEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  // --- Sections ---
  sectionsContainer: {
    padding: 16,
    gap: 20,
    paddingBottom: 32,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },

  // --- Settings Item ---
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingsItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  settingsIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: TEAL_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsTextWrap: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  settingsSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  settingsValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
});
