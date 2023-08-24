import globalStyles from '@/assets/styles/styles';
import placeStyles from '@/assets/styles/place';
const styles = { ...globalStyles, ...placeStyles };

import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio';
import { store } from '@/store'
import { toggleStationToFavourites, setLocalUser } from '@/helpers'

const PlaceFavouriteComponent = ({ station }) => {
  const { user } = useSnapshot(store)

  const handleFavouriteStation = (id, csrf) => {
    toggleStationToFavourites(id, csrf)
      .then(() => {
        setLocalUser()
      })
      .catch(error => {
        console.log('toggleStationToFavourites error', error);
      })
  }

  return (
    user && <TouchableOpacity onPress={() => handleFavouriteStation(station.id, user.csrf)} style={styles.placeFavouritesWrapper}>
      {
        user.favourite_places.filter(_ => _.l_id == station.id).length ?
          <Icon name="star" solid style={[styles.placeFavouritesIcon, styles.placeFavouritesIconActive]}></Icon> : <Icon name="star" style={[styles.placeFavouritesIcon, styles.placeFavouritesIconInactive]}></Icon>
      }
    </TouchableOpacity>
  );
};

export default PlaceFavouriteComponent;
