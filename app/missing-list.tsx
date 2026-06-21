import { Ionicons } from '@expo/vector-icons';
import { ScreenTransition } from 'components/UI/ScreenTransition';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PURPLE, PURPLE_BG, PURPLE_LIGHT } from '../components/core/const';
import { MOCK_PERSONS } from '../src/data/mockData';

export default function MissingListScreen() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_PERSONS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScreenTransition>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerIconBox}>
          <Ionicons name="people" size={24} color={PURPLE} />
        </View>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Missing People</Text>
          <Text style={styles.headerSub}>Active and resolved cases</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.searchClear}>
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.headerCell, { width: 140 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 60 }]}>Age</Text>
              <Text style={[styles.headerCell, { width: 80 }]}>Gender</Text>
              <Text style={[styles.headerCell, { width: 160 }]}>Last Seen</Text>
              <Text style={[styles.headerCell, { width: 180 }]}>Location</Text>
              <Text style={[styles.headerCell, { width: 100 }]}>Status</Text>
            </View>

            {/* Table Rows */}
            {filtered.length === 0 ? (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No matching records found</Text>
              </View>
            ) : (
              filtered.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.tableRow,
                    index === filtered.length - 1 && { borderBottomWidth: 0 },
                  ]}>
                  <Text style={[styles.cell, styles.cellBold, { width: 140 }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={[styles.cell, { width: 60 }]}>{item.age}</Text>
                  <Text style={[styles.cell, { width: 80 }]}>{item.gender}</Text>
                  <Text style={[styles.cell, { width: 160 }]} numberOfLines={1}>
                    {item.lastSeen}
                  </Text>
                  <Text style={[styles.cell, { width: 180 }]} numberOfLines={1}>
                    {item.location}
                  </Text>
                  <View style={[styles.cell, { width: 100 }]}>
                    <View
                      style={[
                        styles.statusBadge,
                        item.status === 'Missing' ? styles.statusMissing : styles.statusFound,
                      ]}>
                      <Text
                        style={[
                          styles.statusText,
                          item.status === 'Missing'
                            ? styles.statusTextMissing
                            : styles.statusTextFound,
                        ]}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
    </ScreenTransition>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: PURPLE_BG,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: PURPLE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: PURPLE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  headerSub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    height: '100%',
  },
  searchClear: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyRow: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: PURPLE_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  headerCell: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  cell: {
    fontSize: 13,
    color: '#4B5563',
    paddingHorizontal: 12,
  },
  cellBold: {
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusMissing: {
    backgroundColor: '#FEF2F2',
  },
  statusFound: {
    backgroundColor: '#ECFDF5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusTextMissing: {
    color: '#EF4444',
  },
  statusTextFound: {
    color: '#10B981',
  },
});