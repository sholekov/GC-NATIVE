import { useRouter } from 'expo-router';
import React, { Component } from 'react';
import { View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StackBackButtonComponent = () => {
  const navigation = useRouter();
  return (
    <Pressable onPress={() => navigation.back()} style={{ backgroundColor: 'transparent', padding: 8, margin: -8, }}>
      <Icon name="chevron-left" size={23} color={'#333'} />
    </Pressable>
  );
};

export default StackBackButtonComponent;
