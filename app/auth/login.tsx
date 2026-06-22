import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RichPaperPlaneLoader from 'components/UI/PaperPlaneLoader';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../components/core/request';

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

  const isFetching = false;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      phone: '9876543234',
      password: '123456',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values);
      const { token, user } = response?.data || {};
      await AsyncStorage.setItem(
        'auth',
        JSON.stringify({
          token,
          user,
        })
      );
      router.replace('/home');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Something went wrong';
      console.log(message);
    }
  };

  const showLoader = isSubmitting || isFetching;

  if (showLoader) return <RichPaperPlaneLoader />;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
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
          <LinearGradient
            colors={['#0DB893', '#0891B2', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingTop: Platform.OS === 'ios' ? 60 : 48,
              paddingBottom: 36,
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
          </LinearGradient>

          {/* ===== FORM CARD ===== */}
          <View
            style={{
              marginTop: -24,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 24,
              paddingTop: 28,
              paddingBottom: 40,
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: -4 },
              elevation: 4,
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
            <FadeInView delay={560}>
              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                style={({ pressed }) => ({
                  marginTop: 100,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: '#0DB893',
                  shadowColor: '#0DB893',
                  shadowOpacity: pressed ? 0.45 : 0.3,
                  shadowRadius: pressed ? 20 : 14,
                  shadowOffset: { width: 0, height: pressed ? 8 : 6 },
                  elevation: pressed ? 10 : 6,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  opacity: isSubmitting ? 0.75 : 1,
                })}>
                <LinearGradient
                  colors={['#0DB893', '#0891B2', '#0A9A7E']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    marginTop: 20,
                    height: 60,
                    borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 32,
                  }}>
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Ionicons
                        name="log-in-outline"
                        size={22}
                        color="#FFFFFF"
                        style={{ marginRight: 10 }}
                      />
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '800',
                          color: '#FFFFFF',
                          letterSpacing: 0.8,
                        }}>
                        Login Account
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </Pressable>
            </FadeInView>

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
  );
}
