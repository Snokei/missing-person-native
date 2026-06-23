import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ProfileData = {
  name: string;
  title: string;
  company?: string;
  helpingWith: string[];
  avatarUri?: string;
  phone?: string;
  email?: string;
};

interface ProfileCardProps {
  data: ProfileData;
}

export default function ProfileCard({ data }: ProfileCardProps) {
  const { name, title, company, helpingWith, avatarUri, phone, email } = data;

  const handleCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleEmail = () => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Left Side: Avatar */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                avatarUri ??
                'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&auto=format&fit=crop',
            }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* Right Side: Content */}
        <View style={styles.contentContainer}>
          {/* Header section */}
          <View>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.titleText}>
              {title}
              {company ? (
                <>
                  {' at '}
                  <Text style={styles.companyText}>{company}</Text>
                </>
              ) : null}
            </Text>
          </View>

          {/* Tags section */}
          <View style={styles.tagsSection}>
            <Text style={styles.helpingText}>Helping with:</Text>
            <View style={styles.tagsRow}>
              {helpingWith.map((item, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Buttons section */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleCall}>
              <Ionicons name="call-outline" size={16} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleEmail}>
              <Ionicons name="mail-outline" size={16} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    // Shadows for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    width: 110,
    height: 130,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // In case image takes time to load
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  companyText: {
    color: '#5B5CE6', // The purple color for 'Meta'
    textDecorationLine: 'underline',
  },
  tagsSection: {
    marginTop: 12,
    marginBottom: 16,
  },
  helpingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // Requires React Native 0.71+
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12, // Requires React Native 0.71+
  },
  button: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  buttonIcon: {
    marginRight: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
