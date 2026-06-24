import {
  BLUE,
  BLUE_LIGHT,
  FEATURES,
  GREEN,
  GREEN_LIGHT,
  PURPLE,
  PURPLE_LIGHT,
} from 'components/core/const';
import FeatureCard from 'components/UI/FeatureCard';
import { ScreenTransition } from 'components/UI/ScreenTransition';
import StatCard from 'components/UI/StatCard';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getStats } from 'src/data/mockData';
import { registerForPushNotifications } from '@/utils/pushNotifications';

function AnimatedFeatureCard({
  icon,
  title,
  description,
  accent,
  accentBg,
  accentLight,
  onPress,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  accent: string;
  accentBg: string;
  accentLight: string;
  onPress: () => void;
  delay: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <FeatureCard
        icon={icon}
        title={title}
        description={description}
        accent={accent}
        accentBg={accentBg}
        accentLight={accentLight}
        onPress={onPress}
      />
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const stats = useMemo(() => getStats(), []);

  const statItems = [
    {
      icon: 'people' as const,
      label: 'Total Cases',
      value: stats.total,
      color: BLUE,
      bgColor: BLUE_LIGHT,
    },
    {
      icon: 'search' as const,
      label: 'Missing Persons',
      value: stats.missing,
      color: '#EF4444',
      bgColor: '#FEF2F2',
    },
    {
      icon: 'checkmark-circle' as const,
      label: 'Found Persons',
      value: stats.found,
      color: GREEN,
      bgColor: GREEN_LIGHT,
    },
    {
      icon: 'archive' as const,
      label: 'Closed Cases',
      value: stats.closed,
      color: PURPLE,
      bgColor: PURPLE_LIGHT,
    },
  ];

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <ScreenTransition>
      <View style={styles.safeArea}>
        {/* Hero Gradient Header */}
        <LinearGradient
          colors={['#0DB893', '#0891B2', '#6366F1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroHeader}>
          {/* Decorative circles */}
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />

          <View style={styles.heroContent}>
            <Text style={styles.heroGreeting}>Welcome back 👋</Text>
            <Text style={styles.heroTitle}>Missing Finder</Text>
            <Text style={styles.heroSubtitle}>Track, report & find missing persons</Text>
          </View>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {statItems.map((item) => (
              <StatCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
                color={item.color}
                bgColor={item.bgColor}
              />
            ))}
          </View>

          {/* Quick Links Section with Gradient Background */}
          <View style={styles.quickLinksContainer}>
            <LinearGradient
              colors={['#F0FDF4', '#ECFEFF', '#F5F3FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickLinksGradient}>
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#0DB893', '#6366F1', '#0891B2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.sectionAccentBar}
                />
                <Text style={styles.sectionTitle}>Quick Links</Text>
              </View>

              {/* Feature Cards */}
              {FEATURES.map((item, index) => (
                <AnimatedFeatureCard
                  key={item.route}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  accent={item.accent}
                  accentBg={item.accentBg}
                  accentLight={item.accentLight}
                  onPress={() => router.push(item.route)}
                  delay={index * 100}
                />
              ))}
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
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
  heroGreeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    fontWeight: '400',
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLinksContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 4,
  },
  quickLinksGradient: {
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  sectionAccentBar: {
    width: 4,
    height: 22,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
});
