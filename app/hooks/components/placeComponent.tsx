import global from '@/assets/styles/styles';
const styles = { ...global, };

import React, { useCallback, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

import Place from '@/app/partials/(tabs)/(place)'

const PlaceComponent = ({ placeSheetRef, selectedStation, callback, handleSheetChanges }) => {

  const [currentPosition, setCurrentPosition] = useState(1);

  const handleAnimate = useCallback((fromIndex, toIndex) => {
    if (fromIndex > toIndex && fromIndex === currentPosition) {
      handleSheetChanges(-1, {lat: selectedStation.data.lat, lng: selectedStation.data.lng});
    }
    setCurrentPosition(toIndex);
  }, [currentPosition]);

  return (
    <BottomSheet
      style={styles.bottomSheetShadow}
      ref={placeSheetRef}
      index={-1}
      snapPoints={['75%', '90%']}
      enablePanDownToClose={true}
      onClose={ () => callback() }
      onAnimate={handleAnimate}
      >
      { selectedStation ? (
        <Place station={selectedStation}></Place>
      ) : null }
    </BottomSheet>
  );
};

export default PlaceComponent;
