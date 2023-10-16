import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Dimensions, Pressable, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');
const calculatedWidth = width - 32;

const MapActionsComponent = ({ locations, handleSelectedPlace, userLocation, handleUserLocation }) => {
  const inputRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  const [country, setCountry] = useState('');
  const [filteredLocations, setLocations] = useState([]);

  useEffect(() => {
    if (country) {
      const filteredLocations = locations.map((location, index) => ({ ...location, index })).filter(location => {
        if (location.name && location.region) {
          return location.name.toLowerCase().includes(country.toLowerCase()) ||
            location.region.toLowerCase().includes(country.toLowerCase());
        }
      });
      if (filteredLocations.length) {
        setLocations(filteredLocations)
      } else {
        setLocations([])
      }
    }
  }, [country])

  useEffect(() => setCountry(''), [showInput])
  return (
    <>
      {/* CONTAINER */}
      {showInput && (<SafeAreaView style={{ ...styles.container }}>
        <View style={styles.containerSearch}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search here"
            value={country}
            onChangeText={setCountry}
          />
          <Pressable onPress={() => setShowInput(value => !value)} style={styles.containerCloseCTA}>
            <Icon
              name='times'
              style={styles.closeIcon}
            />
          </Pressable>
        </View>
        <View style={styles.containerResults}>
          {country && (<FlatList
            data={filteredLocations}
            renderItem={({ item: location, index }) => (
              <TouchableOpacity onPress={() => handleSelectedPlace(location, location.index)} style={{ margin: 4, padding: 12, borderColor: '#00000010', borderWidth: 1, borderRadius: 8, backgroundColor: '#eeeeee', }}>
                <View>
                  <Icon size={12} name="star" solid style={{ position: 'absolute', top: -8, right: -8, color: 'rgb(255, 212, 59)', }}></Icon>
                  <Text style={{ fontSize: 18, fontWeight: '600', }}>#{location?.id} {location?.name}</Text>
                  <View style={{ marginTop: 4, }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#999', }}>{location?.region}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => Math.random().toString(36).substr(2, 9)}
          />)}
        </View>
      </SafeAreaView>)}

      {/* CTAs */}
      {!showInput && (<>
        <Pressable onPress={() => { handleUserLocation() }} style={[styles.containerCTA, styles.containerUserLocationCTA]}>
          <Icon name='location-arrow' style={styles.containerIcon} />
        </Pressable>
        <Pressable onPress={() => { setShowInput(value => !value); setTimeout(() => { inputRef.current.focus(); }, 100); }} style={[styles.containerCTA, styles.containerSearchCTA]}>
          <Icon name='search' style={styles.containerIcon} />
        </Pressable></>)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2c3e5090',
    width: '100%',
  },

  containerSearch: {
    position: 'relative',
    width: calculatedWidth,
    marginBottom: 8,
  },

  containerCloseCTA: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    // backgroundColor: '#eeeeee',
    // borderRadius: 12,
  },
  closeIcon: {
    fontSize: 16,
    color: '#333',
  },

  input: {
    padding: 8,
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  containerResults: {
    flex: 1,
    width: '100%',
  },


  // CTAs
  containerCTA: {
    position: 'absolute',
    right: 16,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 99,
  },
  containerUserLocationCTA: {
    bottom: 84,
  },
  containerSearchCTA: {
    bottom: 16,
  },

  containerIcon: {
    fontSize: 18,
    color: '#333',
  },

});

export default MapActionsComponent;
