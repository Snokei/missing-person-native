import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from 'components/auth/AppButton';
import RichPaperPlaneLoader from 'components/UI/PaperPlaneLoader';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../components/core/request';
import { useAlertPanel } from '../../components/helpers/ShowAlert';

type LoginFormValues = {
  phone: string;
  password: string;
};

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}>
      {children}
    </Animated.View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const { showAlert } = useAlertPanel();
  const setLoginUser = useAppStore((state) => state.setLoginUser);

  const isFetching = false;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      phone: '9876543210',
      password: '123456',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values);
      const { token, user } = response?.data || {};
      const userData = {
        token,
        user,
      };
      setLoginUser(userData);
      await AsyncStorage.setItem('auth', JSON.stringify(userData));
      router.replace('/home');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      showAlert({
        title: 'Login Failed',
        message,
        type: 'error',
      });
    }
  };

  const showLoader = isSubmitting || isFetching;

  if (showLoader) return <RichPaperPlaneLoader />;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0DB893', '#0891B2', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              keyboardShouldPersistTaps="handled">
              {/* ===== HERO GRADIENT HEADER ===== */}
              <View
                style={{
                  paddingTop: Platform.OS === 'ios' ? 30 : 48,
                  paddingBottom: 48,
                  paddingHorizontal: 28,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                {/* Decorative circles */}
                <View
                  style={{
                    position: 'absolute',
                    width: 220,
                    height: 220,
                    borderRadius: 110,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    top: -60,
                    right: -50,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    bottom: -40,
                    left: -30,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    top: 40,
                    left: '60%',
                  }}
                />

                <FadeInView delay={100}>
                  {/* Shield icon */}
                  <View
                    style={{
                      height: 72,
                      width: 72,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 36,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: 2,
                      borderColor: 'rgba(255, 255, 255, 0.35)',
                      shadowColor: '#000',
                      shadowOpacity: 0.15,
                      shadowRadius: 10,
                      shadowOffset: { width: 0, height: 4 },
                      elevation: 5,
                    }}>
                    <Ionicons name="shield-checkmark" size={32} color="#FFFFFF" />
                  </View>

                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: '800',
                      color: '#FFFFFF',
                      letterSpacing: 0.5,
                      marginTop: 20,
                    }}>
                    Welcome Back
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginTop: 6,
                      lineHeight: 22,
                      maxWidth: '85%',
                    }}>
                    Sign in to manage missing & found person cases
                  </Text>
                </FadeInView>
              </View>

              {/* ===== FORM CARD ===== */}
              <View
                style={{
                  marginTop: -32,
                  borderRadius: 40,
                  backgroundColor: '#FFFFFF',
                  paddingHorizontal: 28,
                  paddingTop: 32,
                  paddingBottom: 48,
                  shadowColor: '#000',
                  shadowOpacity: 0.12,
                  shadowRadius: 24,
                  shadowOffset: { width: 0, height: -8 },
                  elevation: 12,
                }}>
                <FadeInView delay={250}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '700',
                      color: '#111827',
                      textAlign: 'center',
                    }}>
                    Login Account
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#6B7280',
                      textAlign: 'center',
                      marginTop: 6,
                    }}>
                    Enter your credentials to continue
                  </Text>
                </FadeInView>

                {/* Phone Input */}
                <FadeInView delay={350}>
                  <View style={{ marginTop: 28 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: 6,
                        marginLeft: 4,
                        letterSpacing: 0.3,
                      }}>
                      PHONE NUMBER
                    </Text>
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F8FAFC',
                            borderWidth: 1.5,
                            borderColor: '#E2E8F0',
                            borderRadius: 14,
                            height: 54,
                            paddingHorizontal: 16,
                          }}>
                          <Ionicons
                            name="call-outline"
                            size={18}
                            color="#94A3B8"
                            style={{ marginRight: 12 }}
                          />
                          <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Enter phone number"
                            placeholderTextColor="#94A3B8"
                            keyboardType="phone-pad"
                            style={{
                              flex: 1,
                              fontSize: 15,
                              color: '#111827',
                              height: '100%',
                            }}
                            className="placeholder:text-gray-400"
                          />
                          {value ? (
                            <Ionicons name="checkmark-circle" size={18} color="#0DB893" />
                          ) : null}
                        </View>
                      )}
                    />
                  </View>
                </FadeInView>

                {/* Password Input */}
                <FadeInView delay={420}>
                  <View style={{ marginTop: 18 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: 6,
                        marginLeft: 4,
                        letterSpacing: 0.3,
                      }}>
                      PASSWORD
                    </Text>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F8FAFC',
                            borderWidth: 1.5,
                            borderColor: '#E2E8F0',
                            borderRadius: 14,
                            height: 54,
                            paddingHorizontal: 16,
                          }}>
                          <Ionicons
                            name="lock-closed-outline"
                            size={18}
                            color="#94A3B8"
                            style={{ marginRight: 12 }}
                          />
                          <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Enter password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry
                            style={{
                              flex: 1,
                              fontSize: 15,
                              color: '#111827',
                              height: '100%',
                            }}
                            className="placeholder:text-gray-400"
                          />
                          <TouchableOpacity>
                            <Ionicons name="eye-off-outline" size={18} color="#94A3B8" />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                </FadeInView>

                {/* Remember & Forgot */}
                <FadeInView delay={490}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 16,
                    }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      activeOpacity={0.7}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          borderWidth: 2,
                          borderColor: '#0DB893',
                          backgroundColor: '#0DB893',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 8,
                        }}>
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      </View>
                      <Text style={{ fontSize: 13, color: '#4B5563', fontWeight: '500' }}>
                        Remember Me
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={{ fontSize: 13, color: '#0DB893', fontWeight: '600' }}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </FadeInView>

                {/* Login Button */}
                <AppButton
                  title={'Login Account'}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  icon={'log-in-outline'}
                  marginTop={20}
                  onPress={handleSubmit(onSubmit)}
                />

                {/* OR Divider */}
                <FadeInView delay={630}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 24,
                    }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#F1F5F9' }} />
                    <Text
                      style={{
                        marginHorizontal: 16,
                        fontSize: 12,
                        color: '#94A3B8',
                        fontWeight: '600',
                        letterSpacing: 0.5,
                      }}>
                      OR
                    </Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#F1F5F9' }} />
                  </View>
                </FadeInView>

                {/* Register link */}
                <FadeInView delay={700}>
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    activeOpacity={0.7}>
                    <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '500' }}>
                      {"Don't have an account? "}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#0DB893', fontWeight: '700' }}>
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </FadeInView>

                {/* Security badge */}
                <FadeInView delay={770}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 24,
                    }}>
                    <Ionicons name="shield-outline" size={14} color="#94A3B8" />
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#94A3B8',
                        marginLeft: 6,
                        fontWeight: '500',
                      }}>
                      Secured with end-to-end encryption
                    </Text>
                  </View>
                </FadeInView>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
