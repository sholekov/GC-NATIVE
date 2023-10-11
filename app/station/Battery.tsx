// Import necessary packages
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// Define the Battery component
const Battery = ({ chargeLevel }) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [_chargeLevel, setChargeLevel] = useState(0);

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    console.log('chargeLevel', chargeLevel);
    Animated.timing(animatedValue, {
      toValue: chargeLevel,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [chargeLevel]);

  const batteryWidth = animatedValue.interpolate({
    inputRange: [0, 90],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.batteryContainer}>
      <View style={[styles.battery]}>
        <Animated.View style={[styles.batteryFill, { width: batteryWidth }]} />
        {/* {_chargeLevel === 100 && (
          <Text style={styles.chargeText}>Charged</Text>
        )} */}
      </View>
      <View style={styles.batteryTip} />
    </View>
  );
};

// Define styling
const styles = StyleSheet.create({
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 168,
  },
  battery: {
    width: '100%',
    height: 40,
    paddingLeft: 3,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
  },
  batteryFill: {
    maxWidth: 158,
    height: 30,
    backgroundColor: 'limegreen',
    justifyContent: 'center',
  },
  batteryTip: {
    width: 7,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 2,
    marginLeft: -3,
  },
  chargeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

// Export the Battery component
export default Battery;
