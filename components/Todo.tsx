import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function Todo() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Background blobs (simulated) */}
      <View className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-indigo-200 opacity-20" />
      <View className="absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-purple-200 opacity-20" />

      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-gray-200 bg-white/60 px-5 py-4">
        <View>
          <Text className="text-2xl font-bold text-indigo-600">Today</Text>
          <Text className="text-xs text-gray-500">Tuesday, Oct 24</Text>
        </View>

        <Ionicons name="search" size={22} color="#4f46e5" />
      </View>

      <ScrollView className="flex-1 px-5">
        {/* Focus Card */}
        <View className="mt-5 rounded-2xl bg-indigo-600 p-5">
          <Text className="text-xs uppercase text-white opacity-70">Morning Focus</Text>
          <Text className="mt-2 text-xl font-bold text-white">Product Roadmap Review</Text>

          <View className="mt-4 flex-row items-center rounded-full bg-white/20 px-3 py-2">
            <Ionicons name="timer-outline" size={16} color="white" />
            <Text className="ml-2 text-xs text-white">Deep work • 45m left</Text>
          </View>
        </View>

        {/* Upcoming */}
        <View className="mt-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold">Upcoming</Text>
            <Text className="text-xs font-bold text-indigo-600">3 Tasks</Text>
          </View>

          {/* Task 1 */}
          <TaskItem
            title="Finalize marketing assets"
            time="10:30 AM"
            icon="briefcase-outline"
            color="blue"
          />

          {/* Task 2 */}
          <TaskItem
            title="Pick up fresh sourdough"
            time="04:00 PM"
            icon="cart-outline"
            color="green"
          />

          {/* Task 3 */}
          <TaskItem title="30 min Yoga session" time="06:00 PM" icon="body-outline" color="pink" />
        </View>

        {/* Completed */}
        <View className="mt-8 opacity-60">
          <Text className="mb-3 text-lg font-bold">Completed</Text>

          <CompletedItem title="Morning journal session" time="08:15 AM" />
          <CompletedItem title="Review design systems" time="09:30 AM" />
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-24 right-5 h-16 w-16 items-center justify-center rounded-full bg-indigo-600 shadow-lg">
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View className="flex-row justify-around border-t border-gray-200 bg-white py-3">
        <NavItem icon="checkbox" label="Tasks" active />
        <NavItem icon="calendar" label="Calendar" />
        <NavItem icon="timer" label="Focus" />
        <NavItem icon="settings" label="Settings" />
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-3xl bg-white p-6">
            <Text className="mb-4 text-xl font-bold text-indigo-600">Create New Task</Text>

            <TextInput
              placeholder="What needs to be done?"
              className="mb-4 rounded-xl bg-indigo-50 p-4"
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="rounded-xl bg-indigo-600 p-4">
              <Text className="text-center font-bold text-white">Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

function TaskItem({ title, time, icon, color }: any) {
  return (
    <View className="mb-3 flex-row items-center rounded-xl bg-white p-4 shadow-sm shadow-gray-200">
      <TouchableOpacity>
        <View
          className={`h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-${color}-100`}>
          {/* {false && <Ionicons name="checkmark" size={16} color="white" />} */}
        </View>
      </TouchableOpacity>
      <View className="ml-3 flex-1">
        <Text className="font-semibold">{title}</Text>
        <Text className="text-xs text-gray-500">{time}</Text>
      </View>
    </View>
  );
}

function CompletedItem({ title, time }: any) {
  return (
    <View className="mb-2 flex-row items-center rounded-lg bg-gray-100 p-3">
      <Ionicons name="checkmark-circle" size={18} color="green" />
      <View className="ml-3">
        <Text className="text-gray-500 line-through">{title}</Text>
        <Text className="text-xs text-gray-400">{time}</Text>
      </View>
    </View>
  );
}

function NavItem({ icon, label, active }: any) {
  return (
    <View className="items-center">
      <Ionicons name={icon} size={20} color={active ? '#4f46e5' : '#9ca3af'} />
      <Text className={active ? 'text-xs text-indigo-600' : 'text-xs text-gray-400'}>{label}</Text>
    </View>
  );
}
