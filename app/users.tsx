import { Ionicons } from '@expo/vector-icons';
import { BLUE, BLUE_BG, BLUE_LIGHT, BLUE_MID } from 'components/core/const';
import { ScreenTransition } from 'components/UI/ScreenTransition';
import { useUsers } from 'hooks/getUsers';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Types ---
export interface User {
  id: string | number;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: 'active' | 'inactive' | string;
}

// --- Constants ---
const COL_WIDTHS = {
  name: 220,
  email: 240,
  phone: 120,
  role: 120,
  status: 120,
};

export default function UsersScreen() {
  const [search, setSearch] = useState('');
  const { data: rawUsers, isFetching, error } = useUsers();

  // --- Memoized Filtering ---
  const users = useMemo(() => {
    if (!rawUsers) return [];
    if (!search) return rawUsers;

    const searchLower = search.toLowerCase();
    return rawUsers.filter((user: User) => {
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
    });
  }, [rawUsers, search]);

  // --- Helpers ---
  const getInitials = useCallback((name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const getStatusConfig = useCallback((status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { color: '#059669', bg: '#D1FAE5' }; // Emerald
      case 'inactive':
        return { color: '#DC2626', bg: '#FEE2E2' }; // Red
      default:
        return { color: '#4B5563', bg: '#F3F4F6' }; // Gray
    }
  }, []);

  // --- Renderers ---
  const renderItem = useCallback(
    ({ item, index }: { item: User; index: number }) => {
      const isLast = index === users.length - 1;
      const statusConfig = getStatusConfig(item.status);

      return (
        <View style={[styles.tableRow, isLast && styles.lastRow]}>
          {/* Name Column */}
          <View style={[styles.cell, { width: COL_WIDTHS.name }]}>
            <View style={styles.nameCellWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(item.name || '')}</Text>
              </View>
              <Text style={styles.cellBold} numberOfLines={1}>
                {item.name || 'Unknown'}
              </Text>
            </View>
          </View>

          {/* Email Column */}
          <View style={[styles.cell, { width: COL_WIDTHS.email }]}>
            <Text style={styles.cellText} numberOfLines={1}>
              {item.email || '-'}
            </Text>
          </View>

          {/* Phone Column */}
          <View style={[styles.cell, { width: COL_WIDTHS.phone }]}>
            <Text style={styles.cellText} numberOfLines={1}>
              {item.phone || '-'}
            </Text>
          </View>

          {/* Role Column */}
          <View style={[styles.cell, { width: COL_WIDTHS.role }]}>
            <Text style={styles.cellText} numberOfLines={1}>
              {item.role || 'User'}
            </Text>
          </View>

          {/* Status Column */}
          <View style={[styles.cell, { width: COL_WIDTHS.status }]}>
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
              <View style={[styles.statusDot, { backgroundColor: statusConfig.color }]} />
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {(item.status || 'Unknown').toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      );
    },
    [users.length, getInitials, getStatusConfig]
  );

  const keyExtractor = useCallback((item: User) => item.id.toString(), []);

  return (
    <ScreenTransition>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconBox}>
            <Ionicons name="people" size={24} color={BLUE} />
          </View>
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Users</Text>
            <Text style={styles.headerSub}>Manage and view all users</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, phone or email..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}
              style={styles.searchClear}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Table Container */}
        <View style={styles.tableContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} bounces={false}>
            <View>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.headerCell, { width: COL_WIDTHS.name }]}>NAME</Text>
                <Text style={[styles.headerCell, { width: COL_WIDTHS.email }]}>EMAIL</Text>
                <Text style={[styles.headerCell, { width: COL_WIDTHS.phone }]}>PHONE</Text>
                <Text style={[styles.headerCell, { width: COL_WIDTHS.role }]}>ROLE</Text>
                <Text style={[styles.headerCell, { width: COL_WIDTHS.status }]}>STATUS</Text>
              </View>

              {/* Table Body */}
              {isFetching ? (
                <View style={styles.centerContainer}>
                  <ActivityIndicator size="large" color={BLUE} />
                  <Text style={styles.loadingText}>Loading users...</Text>
                </View>
              ) : error ? (
                <View style={styles.centerContainer}>
                  <View style={styles.errorIconWrap}>
                    <Ionicons name="alert-circle" size={32} color="#EF4444" />
                  </View>
                  <Text style={styles.errorText}>Failed to load users</Text>
                  <Text style={styles.errorSubText}>
                    Please check your connection and try again
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={users}
                  keyExtractor={keyExtractor}
                  showsVerticalScrollIndicator={true}
                  renderItem={renderItem}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={5}
                  contentContainerStyle={users.length === 0 ? styles.emptyContainer : null}
                  ListEmptyComponent={
                    <View style={styles.centerContainer}>
                      <View style={styles.emptyIconWrap}>
                        <Ionicons name="people-outline" size={32} color={BLUE} />
                      </View>
                      <Text style={styles.emptyText}>No users found</Text>
                      <Text style={styles.emptySubText}>
                        {search
                          ? 'Try adjusting your search filters'
                          : 'No users are currently available'}
                      </Text>
                    </View>
                  }
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScreenTransition>
  );
}

// --- Styles ---
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
    paddingBottom: 20,
    gap: 16,
  },
  headerIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: BLUE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  searchClear: {
    padding: 4,
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB', // Subtler gray for enterprise look
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 14,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    paddingHorizontal: 16,
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#4B5563',
  },
  cellBold: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flexShrink: 1,
  },
  nameCellWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: BLUE_MID,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: BLUE,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  centerContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: Object.values(COL_WIDTHS).reduce((a, b) => a + b, 0), // Span full table width
  },
  emptyContainer: {
    flexGrow: 1,
  },
  loadingText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 12,
  },
  errorIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  errorSubText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: BLUE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
 