import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Pressable, Text, ViewStyle } from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle | ViewStyle[];
  marginTop?: number;
}

export default function AppButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  style,
  marginTop = 0,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        style,
        {
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
          opacity: disabled || loading ? 0.75 : 1,
        },
      ]}>
      <LinearGradient
        colors={['#0DB893', '#0891B2', '#0A9A7E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          marginTop,
          height: 50,
          borderRadius: 7,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 32,
        }}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            {icon && <Ionicons name={icon} size={22} color="#FFFFFF" style={{ marginRight: 10 }} />}

            <Text
              style={{
                fontSize: 17,
                fontWeight: '800',
                color: '#FFFFFF',
                letterSpacing: 0.8,
              }}>
              {title}
            </Text>
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}
