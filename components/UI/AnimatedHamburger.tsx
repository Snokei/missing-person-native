import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SPRING_CONFIG = {
  damping: 14,
  stiffness: 120,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

interface AnimatedHamburgerProps {
  isDrawerOpen?: boolean;
}

export function AnimatedHamburger({ isDrawerOpen = false }: AnimatedHamburgerProps) {
  const navigation = useNavigation();

  // Animation values
  const topRotate = useSharedValue(0);
  const middleScale = useSharedValue(1);
  const middleOpacity = useSharedValue(1);
  const bottomRotate = useSharedValue(0);
  const topTranslateY = useSharedValue(0);
  const bottomTranslateY = useSharedValue(0);

  useEffect(() => {
    if (isDrawerOpen) {
      // Animate to X shape
      topRotate.value = withSpring(45, SPRING_CONFIG);
      bottomRotate.value = withSpring(-45, SPRING_CONFIG);
      topTranslateY.value = withSpring(6, SPRING_CONFIG);
      bottomTranslateY.value = withSpring(-6, SPRING_CONFIG);
      middleScale.value = withTiming(0, { duration: 150 });
      middleOpacity.value = withTiming(0, { duration: 100 });
    } else {
      // Animate back to hamburger
      topRotate.value = withSpring(0, SPRING_CONFIG);
      bottomRotate.value = withSpring(0, SPRING_CONFIG);
      topTranslateY.value = withSpring(0, SPRING_CONFIG);
      bottomTranslateY.value = withSpring(0, SPRING_CONFIG);
      middleScale.value = withSpring(1, SPRING_CONFIG);
      middleOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [isDrawerOpen]);

  const topLineStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${topRotate.value}deg` },
      { translateY: topTranslateY.value },
    ],
  }));

  const middleLineStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: middleScale.value }],
    opacity: middleOpacity.value,
  }));

  const bottomLineStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${bottomRotate.value}deg` },
      { translateY: bottomTranslateY.value },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 }],
  }));

  const handlePress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.button}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.View style={[styles.line, topLineStyle]} />
        <Animated.View style={[styles.line, middleLineStyle]} />
        <Animated.View style={[styles.line, bottomLineStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginLeft: 4,
  },
  container: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  line: {
    width: 24,
    height: 2.5,
    borderRadius: 4,
    backgroundColor: '#111827',
  },
});