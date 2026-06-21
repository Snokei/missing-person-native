import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Missing Person Report',
    message: 'A new missing person case has been filed in your area.',
    time: '2 min ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Case Resolved',
    message: 'Missing person case #1024 has been marked as found.',
    time: '1 hour ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'Location Update',
    message: 'A potential sighting has been reported near Sector 12.',
    time: '3 hours ago',
    read: false,
    type: 'warning',
  },
  {
    id: '4',
    title: 'Verification Required',
    message: 'Please verify the information for case #1089.',
    time: '1 day ago',
    read: true,
    type: 'error',
  },
  {
    id: '5',
    title: 'New Comment',
    message: 'Someone commented on missing person case #1056.',
    time: '2 days ago',
    read: true,
    type: 'info',
  },
];

function getTypeColor(type: Notification['type']) {
  switch (type) {
    case 'info':
      return '#3B82F6';
    case 'success':
      return '#10B981';
    case 'warning':
      return '#F59E0B';
    case 'error':
      return '#EF4444';
  }
}

function getTypeIcon(type: Notification['type']) {
  switch (type) {
    case 'info':
      return 'information-circle';
    case 'success':
      return 'checkmark-circle';
    case 'warning':
      return 'alert-circle';
    case 'error':
      return 'close-circle';
  }
}

// Context to allow opening the notification panel from anywhere
interface NotificationContextType {
  openNotificationPanel: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType>({
  openNotificationPanel: () => {},
  unreadCount: 0,
});

export function useNotificationPanel() {
  return useContext(NotificationContext);
}

function NotificationSheetContent({
  notifications,
  unreadCount,
  markAllAsRead,
  markAsRead,
}: {
  notifications: Notification[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
}) {
  return (
    <View style={styles.sheetContainer}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <View>
          <Text style={styles.drawerTitle}>Notifications</Text>
          <Text style={styles.drawerSubtitle}>
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'No new notifications'}
          </Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7}>
            <Text style={styles.markAllReadText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notification List */}
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        ) : (
          notifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => markAsRead(item.id)}
              activeOpacity={0.7}
              style={[
                styles.notificationItem,
                !item.read && styles.notificationItemUnread,
              ]}>
              <View
                style={[
                  styles.typeIcon,
                  { backgroundColor: `${getTypeColor(item.type)}15` },
                ]}>
                <Ionicons
                  name={getTypeIcon(item.type) as any}
                  size={20}
                  color={getTypeColor(item.type)}
                />
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationTitleRow}>
                  <Text
                    style={[
                      styles.notificationTitle,
                      !item.read && styles.notificationTitleUnread,
                    ]}
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage} numberOfLines={2}>
                  {item.message}
                </Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </BottomSheetScrollView>
    </View>
  );
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const snapPoints = useMemo(() => ['50%', '80%'], []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const openNotificationPanel = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <NotificationContext.Provider value={{ openNotificationPanel, unreadCount }}>
        {children}
      </NotificationContext.Provider>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose
        enableOverDrag={false}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        handleStyle={styles.sheetHandleContainer}
        animateOnMount
        keyboardBlurBehavior="restore">
        <NotificationSheetContent
          notifications={notifications}
          unreadCount={unreadCount}
          markAllAsRead={markAllAsRead}
          markAsRead={markAsRead}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export function NotificationBell() {
  const { openNotificationPanel, unreadCount } = useNotificationPanel();

  return (
    <TouchableOpacity
      onPress={openNotificationPanel}
      activeOpacity={0.7}
      style={styles.bellButton}>
      <Ionicons name="notifications-outline" size={24} color="#374151" />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bellButton: {
    position: 'relative',
    padding: 4,
    marginRight: 8,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  sheetContainer: {
    flex: 1,
  },
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  sheetHandleContainer: {
    paddingTop: 8,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  drawerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  markAllReadText: {
    fontSize: 13,
    color: '#0DB893',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  notificationItemUnread: {
    backgroundColor: '#F0FDFA',
    borderColor: 'rgba(13, 184, 147, 0.2)',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  notificationTitleUnread: {
    fontWeight: '700',
    color: '#111827',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0DB893',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 12,
    fontWeight: '500',
  },
});