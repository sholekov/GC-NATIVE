
function getFirstTwoDigits(num: number) {
  const str = Math.abs(num).toString();
  return parseInt(str.slice(-2), 10);
}

const BatteryComponent = ({small = false}: {small?: boolean}) => {
  const { messages } = useSnapshot(charging)
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [chargeLevel, setChargeLevel] = useState(null);

  useEffect(() => {
    if (messages) {
      setChargeLevel(getFirstTwoDigits(messages[1] - 1));
    }
  }, [messages])

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
      <View style={[small ? styles.batterySmall : styles.battery]}>
        <Animated.View style={[styles.batteryFill, { height: batteryHeight }]} />
      </View>
    </View >
  );
};

import React, { Component, useEffect, useState } from 'react';

import { View, Text, Animated, StyleSheet } from 'react-native';

import { useSnapshot } from 'valtio';
import { charging, } from '@/charging'

// Styles
import globalStyles from '@/assets/styles/styles';
import batteryStyles from '@/assets/styles/battery';
const styles = { ...globalStyles, ...batteryStyles };

export default BatteryComponent;
