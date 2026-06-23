import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileCard from '../../components/UI/ProfileCard';
import { ScreenTransition } from '../../components/UI/ScreenTransition';
import { TEAL, TEAL_BG } from '../../components/core/const';

const emergencyContacts = [
  {
    name: 'Gaurav',
    title: 'President',
    company: undefined,
    helpingWith: ['App control', 'Developer'],
    avatarUri: undefined,
    phone: '+91-9876543210',
    email: 'gaurav@example.com',
  },
  {
    name: 'Himanshu',
    title: 'Commissioner',
    company: undefined,
    helpingWith: ['Business Owner'],
    avatarUri: undefined,
    phone: '+91-9876543211',
    email: 'himanshu@example.com',
  },
];

export default function EmergencyContactsScreen() {
  return (
    <ScreenTransition>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Profile Cards */}
          {emergencyContacts.map((contact, index) => (
            <ProfileCard key={index} data={contact} />
          ))}

          {/* Emergency Contacts List */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="call-outline" size={18} color={TEAL} />
              <Text style={styles.sectionHeaderText}>Quick Dial Contacts</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>Police</Text>
                <Text style={styles.contactNumber}>100</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#EF4444' }]}>
                <Ionicons name="medical" size={20} color="#fff" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>Ambulance</Text>
                <Text style={styles.contactNumber}>108</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#F59E0B' }]}>
                <Ionicons name="flame" size={20} color="#fff" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>Fire Department</Text>
                <Text style={styles.contactNumber}>101</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
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
  scrollContent: {
    paddingBottom: 32,
  },
  // Section Card
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  // Contact Items
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  contactNumber: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  callButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
});
