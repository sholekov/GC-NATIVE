//import liraries
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const AccountHeaderComponent = ({ user }) => {
  // const BASE_URI = process.env.EXPO_PUBLIC_API_URL;
  // const imageUrl = BASE_URI + "images/clients/" + user.id + ".png"

  // const [theImage, setTheImage] = useState(null);

  // useEffect(() => {
  //   axios.get(imageUrl)
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log("Image exists!");
  //         setTheImage(true)
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response && error.response.status === 404) {
  //         console.log("Image not found.");
  //       } else {
  //         console.error("An error occurred:", error.message);
  //       }
  //     });
  // }, []);

  return (
    <View style={{ flexDirection: 'row', padding: 18, alignItems: 'center', }}>
      {user.image ?
        <Image
          source={{ uri: user.image }}
          style={{ width: 72, height: 72, borderRadius: 36, marginRight: 18, }}
        /> : <Icon
          name='user-circle'
          size={72}
          color={'#333'}
          style={{ marginRight: 18, opacity: .7, }}
        />}
      <Text style={{ fontSize: 18, fontWeight: '500' }}>Hi, {user.name}!</Text>
    </View>
  );
};

export default AccountHeaderComponent;
