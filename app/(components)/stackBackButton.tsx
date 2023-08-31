import { useRouter } from 'expo-router';
import React, { Component } from 'react';
import { View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StackBackButtonComponent = () => {
  const navigation = useRouter();
  return (
    <View style={{ backgroundColor: 'transparent', paddingHorizontal: 8, marginLeft: -8, }}>
      <Pressable onPress={() => navigation.back()}>
        <Icon name="chevron-left" size={23} color={'#333'} />
      </Pressable>
    </View>
  );
};

export default StackBackButtonComponent;
