
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';


import { useTranslation } from 'react-i18next';
const Loggedin = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* <Text>Home</Text> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Loggedin;
