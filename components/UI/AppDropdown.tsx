import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
  const containerRef = useRef<View>(null);
  const [layout, setLayout] = useState({ width: 0, x: 0 });

  return (
    <View
      ref={containerRef}
      onLayout={(e) => {
        const { width } = e.nativeEvent.layout;
        containerRef.current?.measureInWindow((x) => {
          setLayout({ width, x });
        });
      }}
      style={[
        styles.container,
        focused && styles.containerFocused,
        focused && styles.shadowFocused,
      ]}>
      {icon && (
        <Ionicons name={icon} size={18} color={focused ? TEAL : '#9CA3AF'} style={styles.icon} />
      )}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        containerStyle={[
          styles.dropdownContainer,
          { width: layout.width, left: layout.x },
        ]}
        itemTextStyle={styles.itemText}
        activeColor={TEAL_LIGHT}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={label}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 20,
    height: 50,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginTop: 0,
  },
  containerFocused: {
    borderColor: TEAL,
    backgroundColor: TEAL_LIGHT,
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
    height: 50,
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
    borderRadius: 6,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
  },
});