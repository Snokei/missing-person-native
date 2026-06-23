import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenTransition } from '../../components/UI/ScreenTransition';
import { TEAL, TEAL_BG } from '../../components/core/const';

export default function AboutScreen() {
  return (
    <ScreenTransition>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.aboutContainer}>
          <View style={styles.aboutHeaderSection}>
            <View style={styles.aboutIconBox}>
              <Ionicons name="rocket" size={38} color="#FFFFFF" />
            </View>
            <Text style={styles.aboutTitle}>Enterprise Nexus</Text>
            <Text style={styles.aboutSubtitle}>Empowering Global Architecture</Text>
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutCardTitle}>Our Corporate Mission</Text>
            <Text style={styles.aboutCardText}>
              To platform microservices dynamically using unified mobile telemetry patterns, ensuring
              secure high concurrency sync.
            </Text>
            <View style={styles.aboutDivider} />
            <Text style={styles.aboutCardTitle}>Integrated Infrastructure</Text>
            <Text style={styles.aboutCardText}>
              • End-to-end edge encryption security wrappers.{'\n'}• Biometric verification modules.
              {'\n'}• Multi-tenant theme integration adapters.
            </Text>
          </View>

          <View style={styles.aboutButtonsRow}>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:support@nexus.io')}
              style={styles.aboutButton}>
              <Ionicons name="mail" size={18} color={TEAL} />
              <Text style={styles.aboutButtonText}>Email Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://google.com')}
              style={styles.aboutButton}>
              <Ionicons name="earth" size={18} color={TEAL} />
              <Text style={styles.aboutButtonText}>Visit Nexus</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.aboutFooter}>
            © 2026 Enterprise Nexus Inc. All Rights Reserved.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TEAL_BG,
  },
  aboutContainer: {
    padding: 24,
    alignItems: 'center',
    paddingBottom: 32,
  },
  aboutHeaderSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  aboutIconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: TEAL,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  aboutTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
  },
  aboutSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
  },
  aboutCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  aboutCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  aboutCardText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
    marginBottom: 8,
  },
  aboutDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  aboutButtonsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  aboutButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  aboutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  aboutFooter: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
});