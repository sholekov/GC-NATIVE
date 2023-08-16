import global from '@/assets/styles/styles';
import place from '@/assets/styles/place';
const styles = { ...global, ...place };

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio';
import { store, setupUser } from '@/store'
import { toggleStationToFavourites, getFavouriteStations, setLocalUser } from '@/helpers'

const PlaceFavourite = ({station}) => {
  const { user } = useSnapshot(store)

  
  const handleFavouriteStation = (id, csrf) => {
    toggleStationToFavourites(id, csrf)
        .then( response => {
          setLocalUser()
            // getFavouriteStations()
            //     .then( response => {
            //         setupUser(user, response.data)
            //     })
            //     .catch( error => {
            //         console.log('getFavouriteStations error', error);
            //     })
        })
        .catch( error => {
            console.log('toggleStationToFavourites error', error);
        })
  }

    
  return (
    user && <TouchableOpacity style={{ flexDirection: 'row', position: 'absolute', top: -12, right: 0, padding: 16, }} onPress={() => handleFavouriteStation(station.id, user.csrf)}>
      {
        user.favourite_places.filter(_ => _.l_id == station.id).length ? 
          <Icon size={26} name="star" solid style={{ color: 'rgb(255, 212, 59)', }}></Icon> : <Icon size={26} name="star" style={{ opacity: .25, }}></Icon>
      }
    </TouchableOpacity>
  );
};

export default PlaceFavourite;
