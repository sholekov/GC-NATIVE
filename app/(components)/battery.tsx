//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

// create a component
const BatteryComponent = ({chargeLevel}) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (chargeLevel) {
      Animated.timing(animatedValue, {
        toValue: chargeLevel,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [chargeLevel]);
  
  const batteryHeight = animatedValue.interpolate({
    inputRange: [0, 90],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.batteryContainer}>
      <View style={styles.batteryTip} />
      <View style={[styles.battery]}>
        <Animated.View style={[styles.batteryFill, { height: batteryHeight }]} />
      </View>
    </View >
  );
};

// define your styles
const styles = StyleSheet.create({
  batteryContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  battery: {
    width: 38,
    height: 58,
    // height: '100%',
    // paddingLeft: 3,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  batteryFill: {
    maxHeight: 158,
    width: '100%',
    backgroundColor: 'limegreen',
    // justifyContent: 'center',
    // borderRadius: 99,
  },
  batteryTip: {
    height: 5,
    width: 12,
    backgroundColor: 'black',
    borderRadius: 2,
    marginBottom: -1,
  },
});

//make this component available to the app
export default BatteryComponent;
