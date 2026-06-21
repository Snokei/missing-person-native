import { Ionicons } from '@expo/vector-icons';
import { BLUE, BLUE_BG, BLUE_LIGHT, BLUE_MID } from 'components/core/const';
import { ScreenTransition } from 'components/UI/ScreenTransition';
import { useLocationTracking } from 'hooks/useLocationTracking';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LocationScreen() {
  const { copyLocation, savedLocation, trackingEnabled, isExpoGo } = useLocationTracking();
  const lastUpdatedLabel = savedLocation
    ? new Date(savedLocation.timestamp).toLocaleString()
    : null;

  return (
    <ScreenTransition>
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconBox}>
          <Ionicons name="navigate" size={22} color={BLUE} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Location Tracker</Text>
          <Text style={styles.headerSub}>Real-time GPS monitoring</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: trackingEnabled ? '#22C55E' : '#EF4444' },
              ]}
            />
            <Text style={styles.cardTitle}>
              Background Tracking: {trackingEnabled ? 'Active' : 'Inactive'}
            </Text>
          </View>
          <Text style={styles.cardDesc}>
            {isExpoGo
              ? 'Expo Go supports foreground GPS only. Build a dev client for background tracking.'
              : 'Background tracking continuously saves the latest GPS fix even when the app is closed.'}
          </Text>
          <View style={styles.infoBadge}>
            <Ionicons name="information-circle-outline" size={15} color={BLUE} />
            <Text style={styles.infoBadgeText}>
              GPS permission is requested automatically when the app opens.
            </Text>
          </View>
        </View>

        {/* Coordinates Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconBox}>
              <Ionicons name="location" size={20} color={BLUE} />
            </View>
            <View>
              <Text style={styles.cardTitle}>GPS Coordinates</Text>
              <Text style={styles.cardSubtitle}>Tap a value to copy it</Text>
            </View>
          </View>

          {savedLocation ? (
            <>
              <TouchableOpacity
                style={styles.coordRow}
                onPress={() => void copyLocation('Latitude', savedLocation.latitude)}>
                <View style={styles.coordLabelRow}>
                  <Ionicons name="swap-vertical-outline" size={14} color={BLUE} />
                  <Text style={styles.coordLabel}>Latitude</Text>
                </View>
                <View style={styles.coordValueRow}>
                  <Text style={styles.coordValue}>{savedLocation.latitude}</Text>
                  <Ionicons name="copy-outline" size={14} color={BLUE} style={styles.copyIcon} />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.coordRow}
                onPress={() => void copyLocation('Longitude', savedLocation.longitude)}>
                <View style={styles.coordLabelRow}>
                  <Ionicons name="swap-horizontal-outline" size={14} color={BLUE} />
                  <Text style={styles.coordLabel}>Longitude</Text>
                </View>
                <View style={styles.coordValueRow}>
                  <Text style={styles.coordValue}>{savedLocation.longitude}</Text>
                  <Ionicons name="copy-outline" size={14} color={BLUE} style={styles.copyIcon} />
                </View>
              </TouchableOpacity>

              {lastUpdatedLabel && (
                <View style={styles.timestampRow}>
                  <Ionicons name="time-outline" size={13} color="#6B7280" />
                  <Text style={styles.timestampText}>
                    Last fix:{' '}
                    <Text style={{ fontWeight: '600', color: '#374151' }}>{lastUpdatedLabel}</Text>
                  </Text>
                </View>
              )}

              <Text style={styles.refreshNote}>
                Refreshes every 1 minute while the app is open.
              </Text>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="location-outline" size={40} color={BLUE_MID} />
              <Text style={styles.emptyText}>GPS location not fetched yet.</Text>
              <Text style={styles.emptySubText}>Ensure location permission is granted.</Text>
            </View>
          )}
        </View>

        {/* Note card */}
        {lastUpdatedLabel && (
          <View style={styles.noteCard}>
            <Ionicons name="alert-circle-outline" size={15} color={BLUE} />
            <Text style={styles.noteText}>
              The time above is when the last GPS reading was recorded, not the refresh interval.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BLUE_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: BLUE_BG,
    gap: 12,
  },
  headerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: BLUE_MID,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerSub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 14,
  },

  // Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: BLUE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  cardDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    backgroundColor: BLUE_LIGHT,
    borderRadius: 10,
    padding: 10,
  },
  infoBadgeText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
    lineHeight: 18,
  },

  // Coordinate rows
  coordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  coordLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coordLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  coordValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: BLUE_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  coordValue: {
    fontSize: 13,
    fontWeight: '700',
    color: BLUE,
  },
  copyIcon: {
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 2,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  timestampText: {
    fontSize: 12,
    color: '#6B7280',
  },
  refreshNote: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  emptySubText: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  // Note card
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: BLUE_LIGHT,
    borderRadius: 12,
    padding: 12,
  },
  noteText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
    lineHeight: 18,
  },
});
