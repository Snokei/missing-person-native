import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenTransition } from '../../components/UI/ScreenTransition';
import { TEAL, TEAL_BG, TEAL_LIGHT } from '../../components/core/const';
import { useAppStore } from '../../src/store/useAppStore';

export default function SecurityScreen() {
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

  const InputField = (label: string, target: 'old' | 'next' | 'conf') => (
    <View style={styles.inputFieldContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          secureTextEntry={secure[target]}
          value={form[target]}
          onChangeText={(t) => setForm({ ...form, [target]: t })}
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setSecure({ ...secure, [target]: !secure[target] })}>
          <Ionicons
            name={secure[target] ? 'eye-off' : 'eye'}
            size={18}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenTransition>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.securityContainer}
          enableOnAndroid>
          <View style={styles.securityHeader}>
            <View style={styles.securityIconBox}>
              <Ionicons name="shield-checkmark" size={24} color={TEAL} />
            </View>
            <View>
              <Text style={styles.securityTitle}>Security Settings</Text>
              <Text style={styles.securitySubtitle}>
                Maintain secure encryption configurations across authorization
                layers.
              </Text>
            </View>
          </View>

          <View style={styles.securityCard}>
            {InputField('Current Password', 'old')}
            {InputField('New Password', 'next')}
            {InputField('Confirm New Password', 'conf')}

            <TouchableOpacity
              onPress={handleUpdate}
              disabled={loading}
              style={[
                styles.updateButton,
                loading && styles.updateButtonDisabled,
              ]}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.updateButtonText}>Update Credentials</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TEAL_BG,
  },
  securityContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    marginTop: 8,
  },
  securityIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: TEAL_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.3,
  },
  securitySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 18,
  },
  securityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  inputFieldContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  inputWrap: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#111827',
  },
  updateButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: TEAL,
    marginTop: 4,
  },
  updateButtonDisabled: {
    opacity: 0.6,
  },
  updateButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});