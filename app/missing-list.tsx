import { Ionicons } from '@expo/vector-icons';
import { ScreenTransition } from 'components/UI/ScreenTransition';
import { useUsers } from 'hooks/getUsers';
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PURPLE, PURPLE_BG, PURPLE_LIGHT } from '../components/core/const';

export default function MissingListScreen() {
  const [search, setSearch] = useState('');
  const { data: filteredUsers } = useUsers();

  return (
    <ScreenTransition>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconBox}>
            <Ionicons name="people" size={24} color={PURPLE} />
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Missing People</Text>
            <Text style={styles.headerSub}>Active and resolved cases</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, email or phone..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.searchClear}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Name</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Email</Text>
            <Text style={[styles.headerCell, { flex: 1.3 }]}>Phone</Text>
          </View>

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.tableRow,
                  index === filteredUsers.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}>
                <Text style={[styles.cell, styles.cellBold, { flex: 1.5 }]} numberOfLines={1}>
                  {item.name}
                </Text>

                <Text style={[styles.cell, { flex: 2 }]} numberOfLines={1}>
                  {item.email}
                </Text>

                <Text style={[styles.cell, { flex: 1.3 }]} numberOfLines={1}>
                  {item.phone}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No users found</Text>
              </View>
            }
          />
        </View>
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
    gap: 12,
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
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  searchClear: {
    padding: 4,
  },

  tableContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: PURPLE_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 14,
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
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

  emptyRow: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
