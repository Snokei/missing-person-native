import React, { useEffect, useRef } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';

interface ScreenTransitionProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ScreenTransition({ children, style }: ScreenTransitionProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        { flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        style,
      ]}>
      {children}
    </Animated.View>
  );
}