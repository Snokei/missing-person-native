import { USER_IMAGE } from 'components/core/generalConst';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenTransition } from '../../components/UI/ScreenTransition';
import { TEAL_BG } from '../../components/core/const';
import { useAppStore } from '../../src/store/useAppStore';

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.profileRow}>
    <Text style={styles.profileLabel}>{label}</Text>
    <Text style={styles.profileValue}>{value}</Text>
  </View>
);

export default function ProfileScreen() {
  const { userInfo } = useAppStore();
  const { first_name, last_name, phone, email, role, status, avatar } = userInfo?.user || {};

  return (
    <ScreenTransition>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.profileContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeaderSection}>
            <Image source={{ uri: avatar || USER_IMAGE }} style={styles.profileAvatar} />
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{status || 'Active'}</Text>
            </View>
          </View>

          <View style={styles.profileCard}>
            <Row label="First Name" value={first_name} />
            <View style={styles.sectionDivider} />
            <Row label="Last Name" value={last_name} />
            <View style={styles.sectionDivider} />
            <Row label="Email Address" value={email || 'N/A'} />
            <View style={styles.sectionDivider} />
            <Row label="Phone Number" value={phone} />
            <View style={styles.sectionDivider} />
            <Row label="System Role" value={role || userInfo?.role} />
          </View>
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
  profileContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  profileHeaderSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  profileAvatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  statusBadge: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6EE7B7',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    letterSpacing: 0.5,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  profileRow: {
    paddingVertical: 16,
  },
  profileLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 0,
  },
});
