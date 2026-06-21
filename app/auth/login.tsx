import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../components/auth/Button';
import { TextField } from '../../components/auth/TextField';

type LoginFormValues = {
  mobile: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      mobile: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    void values;
    router.replace('/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4B942]">
      <StatusBar barStyle="dark-content" backgroundColor="#F4B942" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          {/* HEADER */}

          <View className="items-center px-6 pt-10">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-white">
              <Text className="text-4xl">🛡️</Text>
            </View>

            <Text className="mt-6 text-4xl font-black text-black">Hello</Text>

            <Text className="mt-2 text-lg text-black">Welcome Back!</Text>

            <Text className="mt-2 text-center text-black/70">
              Missing & Found Person Management System
            </Text>
          </View>

          {/* FORM CARD */}

          <View
            className="
              mt-8
              flex-1
              rounded-t-[40px]
              bg-white
              px-6
              pb-10
              pt-8
            ">
            <View className="items-center">
              <Text className="text-3xl font-bold text-gray-900">Login Account</Text>

              <Text className="mt-2 text-center text-gray-500">Sign in to continue</Text>
            </View>

            {/* Mobile */}

            <Controller
              control={control}
              name="mobile"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Mobile Number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter Mobile Number"
                  keyboardType="phone-pad"
                  containerClassName="mt-8"
                />
              )}
            />

            {/* Password */}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter Password"
                  secureTextEntry
                  containerClassName="mt-5"
                />
              )}
            />

            {/* Remember */}

            <View className="mt-5 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-2 h-4 w-4 rounded-full bg-green-500" />

                <Text className="text-gray-600">Remember Me</Text>
              </View>

              <TouchableOpacity>
                <Text className="font-medium text-gray-700">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}

            <Button
              title="Login Account"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="mt-8"
            />

            {/* Register */}

            <TouchableOpacity className="mt-6 items-center">
              <Text className="font-medium text-gray-700">Create New Account</Text>
            </TouchableOpacity>

            {/* Stats */}

            <View className="mt-10 flex-row">
              <View className="mr-2 flex-1 rounded-3xl bg-amber-50 p-4">
                <Text className="text-3xl font-bold text-black">25</Text>

                <Text className="mt-1 text-gray-600">Missing Cases</Text>
              </View>

              <View className="ml-2 flex-1 rounded-3xl bg-green-50 p-4">
                <Text className="text-3xl font-bold text-black">14</Text>

                <Text className="mt-1 text-gray-600">Found Persons</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
