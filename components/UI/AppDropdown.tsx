import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TEAL = '#0DB893';
const TEAL_LIGHT = '#E8F8F4';

interface AppDropdownProps {
  label: string;
  value: string | null;
  setValue: (value: string) => void;
  data: { label: string; value: string }[];
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function AppDropdown({ label, value, setValue, data, icon }: AppDropdownProps) {
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, { toValue: 1, duration: 180, useNativeDriver: false }).start();
  };
  const onBlur = () => {
    setFocused(false);
    Animated.timing(borderAnim, { toValue: 0, duration: 180, useNativeDriver: false }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', TEAL],
  });
  const bgColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FAFAFA', TEAL_LIGHT],
  });

  return (
    <View style={styles.outerWrap}>
      {(focused || value) && (
        <Text style={[styles.floatLabel, focused && { color: TEAL }]}>{label}</Text>
      )}
      <Animated.View
        style={[
          styles.container,
          { borderColor, backgroundColor: bgColor },
          focused && styles.shadowFocused,
        ]}>
        {icon && (
          <Ionicons name={icon} size={18} color={focused ? TEAL : '#9CA3AF'} style={styles.icon} />
        )}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.itemText}
          activeColor={TEAL_LIGHT}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={!focused ? label : ''}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(item) => {
            setValue(item.value);
            onBlur();
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrap: {
    position: 'relative',
    marginTop: 6,
  },
  floatLabel: {
    position: 'absolute',
    top: -9,
    left: 16,
    zIndex: 10,
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    backgroundColor: '#fff',
    paddingHorizontal: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  shadowFocused: {
    shadowColor: '#0DB893',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    height: 52,
  },
  placeholder: {
    color: '#9CA3AF',
    fontSize: 15,
  },
  selectedText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '500',
  },
  dropdownContainer: {
    borderRadius: 12,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
  },
});
