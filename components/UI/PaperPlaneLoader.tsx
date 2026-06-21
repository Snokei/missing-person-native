import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function RichPaperPlaneLoader() {
  // Main Airplane Animation Values
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  // Dust Particles Animation Values (Scale & Opacity)
  const dust1Scale = useRef(new Animated.Value(0)).current;
  const dust1Opacity = useRef(new Animated.Value(0)).current;

  const dust2Scale = useRef(new Animated.Value(0)).current;
  const dust2Opacity = useRef(new Animated.Value(0)).current;

  const dust3Scale = useRef(new Animated.Value(0)).current;
  const dust3Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flightAnimation = Animated.sequence([
      // 1. Anticipation: Gentle wind-up (tilt back and shrink)
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.85,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -0.15,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      // 2. Takeoff + Dust Burst: Plane flies out, particles burst open behind it
      Animated.parallel([
        // Plane movement
        Animated.timing(translateX, {
          toValue: 180,
          duration: 1100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -180,
          duration: 1100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.3,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 950,
          useNativeDriver: true,
        }),

        // Dust Particle 1 (Top Left burst)
        Animated.sequence([
          Animated.parallel([
            Animated.timing(dust1Scale, { toValue: 1.2, duration: 200, useNativeDriver: true }),
            Animated.timing(dust1Opacity, { toValue: 0.6, duration: 150, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(dust1Scale, { toValue: 0, duration: 400, useNativeDriver: true }),
            Animated.timing(dust1Opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
          ]),
        ]),

        // Dust Particle 2 (Center puff - delayed slightly)
        Animated.sequence([
          Animated.delay(80),
          Animated.parallel([
            Animated.timing(dust2Scale, { toValue: 1.5, duration: 200, useNativeDriver: true }),
            Animated.timing(dust2Opacity, { toValue: 0.5, duration: 150, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(dust2Scale, { toValue: 0, duration: 450, useNativeDriver: true }),
            Animated.timing(dust2Opacity, { toValue: 0, duration: 450, useNativeDriver: true }),
          ]),
        ]),

        // Dust Particle 3 (Bottom Right wind line)
        Animated.sequence([
          Animated.delay(150),
          Animated.parallel([
            Animated.timing(dust3Scale, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.timing(dust3Opacity, { toValue: 0.7, duration: 150, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(dust3Scale, { toValue: 0, duration: 400, useNativeDriver: true }),
            Animated.timing(dust3Opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
          ]),
        ]),
      ]),

      // 3. Reset everything while hidden
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.4, duration: 0, useNativeDriver: true }),
        Animated.timing(rotate, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(dust1Scale, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(dust2Scale, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(dust3Scale, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),

      // 4. Fade In Plane smoothly
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
    ]);

    Animated.loop(flightAnimation).start();
  }, []);

  const rotationStr = rotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-45deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* --- DUST / WIND PARTICLES BACKGROUND LAYER --- */}
        <Animated.View
          style={[
            styles.dust,
            styles.dust1,
            { transform: [{ scale: dust1Scale }], opacity: dust1Opacity },
          ]}
        />
        <Animated.View
          style={[
            styles.dust,
            styles.dust2,
            { transform: [{ scale: dust2Scale }], opacity: dust2Opacity },
          ]}
        />
        <Animated.View
          style={[
            styles.dust,
            styles.dust3,
            { transform: [{ scale: dust3Scale }], opacity: dust3Opacity },
          ]}
        />

        {/* --- AIRPLANE LAYER --- */}
        <Animated.View
          style={[
            styles.airplaneContainer,
            {
              transform: [{ translateX }, { translateY }, { scale }, { rotate: rotationStr }],
              opacity,
            },
          ]}>
          <Svg width="70" height="70" viewBox="0 0 24 24" fill="none">
            <Path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="#2c3e50"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#90caf9"
            />
            <Path
              d="M11 13L13 18L15 22"
              stroke="#2c3e50"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#e3f2fd"
            />
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  wrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  airplaneContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  /* Dust styles created cleanly using native borders and shapes */
  dust: {
    position: 'absolute',
    backgroundColor: '#cbd5e1', // Light slate/grey cloud color
    borderRadius: 50,
    zIndex: 1,
  },
  dust1: {
    width: 14,
    height: 14,
    top: 25,
    left: 10,
  },
  dust2: {
    width: 22,
    height: 22,
    top: 45,
    left: 25,
    backgroundColor: '#e2e8f0', // Slightly lighter center puff
  },
  dust3: {
    width: 10,
    height: 10,
    top: 60,
    left: 55,
  },
});
