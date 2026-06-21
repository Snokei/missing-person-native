import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

const TEAL = '#0DB893';
const TEAL_LIGHT = '#E8F8F4';

interface AppInputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
}

export default function AppInput({
  label,
  value,
  icon,
  className = '',
  multiline,
  ...props
}: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: focused || !!value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();

    Animated.timing(borderAnim, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [focused, value, animation, borderAnim]);

  const labelTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [multiline ? 16 : 13, -9],
  });
  const labelSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 12],
  });
  const labelColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#9CA3AF', focused ? TEAL : '#6B7280'],
  });
  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', TEAL],
  });
  const bgColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FAFAFA', TEAL_LIGHT],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { borderColor, backgroundColor: bgColor },
        focused && styles.shadowFocused,
      ]}>
      {icon && (
        <Ionicons name={icon} size={18} color={focused ? TEAL : '#9CA3AF'} style={styles.icon} />
      )}

      <View style={styles.inputWrapper}>
        <Animated.Text
          pointerEvents="none"
          style={[
            styles.label,
            {
              top: labelTop,
              fontSize: labelSize,
              color: labelColor,
              left: icon ? 0 : 2,
              backgroundColor: focused || value ? '#fff' : 'transparent',
            },
          ]}>
          {label}
        </Animated.Text>

        <TextInput
          {...props}
          value={value}
          multiline={multiline}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          textAlignVertical={multiline ? 'top' : 'center'}
          placeholderTextColor="#C4C4C4"
          style={[styles.input, multiline && styles.inputMultiline]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 6,
    overflow: 'visible',
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
    marginTop: 2,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    paddingTop: 8,
    paddingBottom: 8,
  },
  label: {
    position: 'absolute',
    zIndex: 10,
    paddingHorizontal: 3,
    fontWeight: '500',
  },
  input: {
    fontSize: 15,
    color: '#111827',
    paddingTop: 8,
    paddingBottom: 4,
    minHeight: 36,
  },
  inputMultiline: {
    minHeight: 90,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
});
