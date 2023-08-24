import { router } from 'expo-router';
import React from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(1);  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start(() => {
      // Navigate to another screen after the animation
      router.replace('home');
    });
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity: fadeAnim }}>
        <Image source={require('@/assets/splash.png')} style={{ ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', }} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;
