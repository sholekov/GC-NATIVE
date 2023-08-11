//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const AccountHeaderComponent = ({user}) => {

  return (
    <View style={{ flexDirection: 'row', padding: 18, alignItems: 'center', }}>
      <Icon 
            name='user-circle'
            size={72}
            color={'#333'}
            style={{ paddingRight: 32, opacity: .7, }}
        />
      <Text style={{ fontSize: 18, fontWeight: '500' }}>Hi, {user.name}!</Text>
    </View>
  );
};

export default AccountHeaderComponent;
