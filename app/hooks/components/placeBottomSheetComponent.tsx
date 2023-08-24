import global from '@/assets/styles/styles';
const styles = { ...global, };

import React, { useCallback, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

import PlaceComponent from '@/app/hooks/components/placeComponent'
import { ActivityIndicator, StyleSheet } from 'react-native';

const PlaceBottomSheetComponent = ({ placeSheetRef, selectedStation, handleSheetChanges }) => {

  const [currentPosition, setCurrentPosition] = useState(1);
  const handleAnimate = useCallback((fromIndex, toIndex, selectedStation) => {
    if (fromIndex > toIndex && fromIndex === currentPosition) {
      handleSheetChanges(-1, { lat: selectedStation?.data.lat, lng: selectedStation?.data.lng });
    }
    setCurrentPosition(toIndex);
  }, [currentPosition]);

  return (
    <BottomSheet
      style={styles.bottomSheetShadow}
      ref={placeSheetRef}
      index={-1}
      snapPoints={['70%']}
      enablePanDownToClose={true}
      onAnimate={ (fromIndex, toIndex) => handleAnimate(fromIndex, toIndex, selectedStation) }
      >
      { selectedStation ? (
        <PlaceComponent station={selectedStation} />
      ) : <ActivityIndicator size="large" style={styles.activityIndicatorStyle} /> }
    </BottomSheet>
  );
};

export default PlaceBottomSheetComponent;
