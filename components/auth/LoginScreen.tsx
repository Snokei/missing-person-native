import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#F4B942]">
      <StatusBar barStyle="dark-content" backgroundColor="#F4B942" />

      {/* HEADER */}
      <View className="items-center px-6 pt-16">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-white shadow">
          <Text className="text-4xl">🛡️</Text>
        </View>

        <Text className="mt-6 text-5xl font-extrabold text-black">Hello</Text>

        <Text className="mt-2 text-xl text-black">Welcome Back!</Text>

        <Text className="mt-4 px-6 text-center text-black/70">
          Missing & Found Person Management System
        </Text>
      </View>

      {/* WHITE CARD */}
      <View
        className="
          mt-10
          flex-1
          rounded-t-[40px]
          bg-white
          px-6
          pt-8
        ">
        {/* TITLE */}
        <View className="items-center">
          <Text className="text-3xl font-bold text-gray-900">Login Account</Text>

          <Text className="mt-3 text-center text-gray-500">
            Sign in to access the police management dashboard
          </Text>
        </View>

        {/* MOBILE */}
        <View className="mt-8">
          <Text className="mb-2 font-semibold text-gray-700">Mobile Number</Text>

          <TextInput
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            className="
              h-14
              rounded-full
              border
              border-gray-200
              bg-gray-50
              px-5
            "
          />
        </View>

        {/* PASSWORD */}
        <View className="mt-5">
          <Text className="mb-2 font-semibold text-gray-700">Password</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry
            className="
              h-14
              rounded-full
              border
              border-gray-200
              bg-gray-50
              px-5
            "
          />
        </View>

        {/* REMEMBER */}
        <View className="mt-5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-2 h-5 w-5 rounded-full bg-green-500" />

            <Text className="text-gray-600">Remember Me</Text>
          </View>

          <TouchableOpacity>
            <Text className="font-semibold text-gray-800">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          className="
            mt-8
            h-14
            items-center
            justify-center
            rounded-full
            bg-[#F4B942]
            shadow
          ">
          <Text className="text-lg font-bold text-black">Login Account</Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <TouchableOpacity className="mt-6 items-center">
          <Text className="font-medium text-gray-700">Create New Account</Text>
        </TouchableOpacity>

        {/* QUICK STATS */}
        <View className="mt-10 flex-row justify-between">
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
    </SafeAreaView>
  );
}
