import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNotificationPanel } from './NotificationPanel';

export function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { openNotificationPanel } = useNotificationPanel();

  const isActive = (route: string) => {
    if (route === 'home' && pathname === '/home') return true;
    if (route === 'location' && pathname === '/location') return true;
    if (route === 'missing' && pathname === '/missing') return true;
    if (route === 'missing-list' && pathname === '/missing-list') return true;
    if (route === 'users' && pathname === '/users') return true;
    if (route === 'SettingsScreen' && pathname === '/SettingsScreen') return true;
    return false;
  };

  const handleNavigation = (routeName: string) => {
    props.navigation.closeDrawer();
    router.push(`/${routeName}`);
  };

  const navItems = [
    {
      route: 'home',
      label: 'Home',
      icon: 'home' as const,
      iconLib: 'ionicons' as const,
      activeColor: '#0DB893',
      activeBg: '#E8F8F4',
      activeBorder: 'rgba(13, 184, 147, 0.3)',
    },
    {
      route: 'location',
      label: 'Location Tracker',
      icon: 'location' as const,
      iconLib: 'ionicons' as const,
      activeColor: '#0891B2',
      activeBg: '#E0F7FA',
      activeBorder: 'rgba(8, 145, 178, 0.3)',
    },
    {
      route: 'missing',
      label: 'Report Missing',
      icon: 'report' as const,
      iconLib: 'octicons' as const,
      activeColor: '#0DB893',
      activeBg: '#E8F8F4',
      activeBorder: 'rgba(13, 184, 147, 0.3)',
    },
    {
      route: 'missing-list',
      label: 'Missing People List',
      icon: 'people' as const,
      iconLib: 'ionicons' as const,
      activeColor: '#6366F1',
      activeBg: '#EEF2FF',
      activeBorder: 'rgba(99, 102, 241, 0.3)',
    },
    {
      route: 'users',
      label: 'Users',
      icon: 'police-badge' as const,
      iconLib: 'materialcommunityicons' as const,
      activeColor: '#2563EB',
      activeBg: '#EFF6FF',
      activeBorder: 'rgba(37, 99, 235, 0.3)',
    },
    {
      route: 'SettingsScreen',
      label: 'Settings',
      icon: 'settings' as const,
      iconLib: 'ionicons' as const,
      activeColor: '#8B5CF6',
      activeBg: '#F5F3FF',
      activeBorder: 'rgba(139, 92, 246, 0.3)',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* GRADIENT HEADER */}
      <LinearGradient
        colors={['#0DB893', '#0891B2', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 56,
          paddingBottom: 28,
          paddingHorizontal: 24,
          overflow: 'hidden',
        }}>
        {/* Decorative circles */}
        <View
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: 'rgba(255,255,255,0.08)',
            top: -50,
            right: -40,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: 'rgba(255,255,255,0.06)',
            bottom: -20,
            left: 10,
          }}
        />

        {/* Avatar + Info */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 68,
              width: 68,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 34,
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderWidth: 2.5,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}>
            <Text style={{ fontSize: 26, fontWeight: '800', color: '#FFFFFF' }}>GS</Text>
          </View>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 }}>
              Gaurav Sharma
            </Text>
            <Text style={{ fontSize: 12, marginTop: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
              gaurav.sharma@example.com
            </Text>
            <View
              style={{
                borderRadius: 20,
                paddingVertical: 4,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginTop: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}>
              <Ionicons name="shield-checkmark" size={11} color="#FFFFFF" />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginLeft: 4,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}>
                Case Coordinator
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}>
        {/* NAVIGATION SECTION */}
        <View style={{ paddingHorizontal: 14 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              paddingHorizontal: 4,
            }}>
            <LinearGradient
              colors={['#0DB893', '#0891B2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: 3, height: 16, borderRadius: 3 }}
            />
            <Text
              style={{
                color: '#6B7280',
                fontSize: 11,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
              }}>
              Navigation
            </Text>
          </View>

          {navItems.map((item) => {
            const active = isActive(item.route);
            return (
              <TouchableOpacity
                key={item.route}
                onPress={() => handleNavigation(item.route)}
                activeOpacity={0.7}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 14,
                    paddingHorizontal: 14,
                    paddingVertical: 13,
                    marginBottom: 6,
                    borderWidth: 1,
                  },
                  active
                    ? {
                        backgroundColor: item.activeBg,
                        borderColor: item.activeBorder,
                        shadowColor: item.activeColor,
                        shadowOpacity: 0.12,
                        shadowRadius: 6,
                        shadowOffset: { width: 0, height: 3 },
                        elevation: 3,
                      }
                    : {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#F1F5F9',
                      },
                ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  {active ? (
                    <LinearGradient
                      colors={
                        item.activeColor === '#0DB893'
                          ? ['#0DB893', '#0891B2']
                          : item.activeColor === '#0891B2'
                            ? ['#0891B2', '#6366F1']
                            : ['#6366F1', '#8B5CF6']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        height: 38,
                        width: 38,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {item.iconLib === 'octicons' ? (
                        <Octicons name={item.icon as any} size={18} color="#FFFFFF" />
                      ) : item.iconLib === 'materialcommunityicons' ? (
                        <MaterialCommunityIcons name={item.icon as any} size={18} color="#FFFFFF" />
                      ) : (
                        <Ionicons name={item.icon as any} size={18} color="#FFFFFF" />
                      )}
                    </LinearGradient>
                  ) : (
                    <View
                      style={{
                        height: 38,
                        width: 38,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F1F5F9',
                      }}>
                      {item.iconLib === 'octicons' ? (
                        <Octicons name={item.icon as any} size={18} color="#94A3B8" />
                      ) : item.iconLib === 'materialcommunityicons' ? (
                        <MaterialCommunityIcons name={item.icon as any} size={18} color="#94A3B8" />
                      ) : (
                        <Ionicons name={item.icon as any} size={18} color="#94A3B8" />
                      )}
                    </View>
                  )}
                  <Text
                    style={[
                      { marginLeft: 12, fontSize: 14 },
                      active
                        ? { fontWeight: '700', color: item.activeColor }
                        : { fontWeight: '600', color: '#374151' },
                    ]}>
                    {item.label}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={15}
                  color={active ? item.activeColor : '#CBD5E1'}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SUPPORT SECTION */}
        <View style={{ paddingHorizontal: 14, marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              paddingHorizontal: 4,
            }}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: 3, height: 16, borderRadius: 3 }}
            />
            <Text
              style={{
                color: '#6B7280',
                fontSize: 11,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 1.2,
              }}>
              Support & Settings
            </Text>
          </View>

          {[
            { icon: 'settings' as const, label: 'Settings', route: 'SettingsScreen' },
            { icon: 'help-circle' as const, label: 'Help & Support', route: null },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => {
                if (item.route) {
                  handleNavigation(item.route);
                }
              }}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 13,
                marginBottom: 6,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#F1F5F9',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View
                  style={{
                    height: 38,
                    width: 38,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F1F5F9',
                  }}>
                  <Ionicons name={item.icon} size={18} color="#94A3B8" />
                </View>
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '600', color: '#374151' }}>
                  {item.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* FOOTER */}
      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderColor: '#E2E8F0',
          backgroundColor: '#F8FAFC',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            router.replace('/auth/login');
          }}
          activeOpacity={0.85}
          style={{ borderRadius: 14, overflow: 'hidden' }}>
          <LinearGradient
            colors={['#FEE2E2', '#FEF2F2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 14,
              borderWidth: 1,
              borderColor: '#FECACA',
              borderRadius: 14,
            }}>
            <Ionicons name="log-out" size={18} color="#EF4444" />
            <Text style={{ color: '#EF4444', fontWeight: '700', fontSize: 14, marginLeft: 8 }}>
              Sign Out
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            color: '#94A3B8',
            fontWeight: '500',
            marginTop: 12,
            textTransform: 'uppercase',
            letterSpacing: 1.2,
          }}>
          Missing Finder v1.0.0
        </Text>
      </View>
    </View>
  );
}
