import global from '@/assets/styles/styles';
const styles = { ...global, };

import React, { useCallback, useState } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

import PlaceComponent from '@/app/hooks/components/placeComponent'

const PlaceBottomSheetComponent = ({ placeSheetRef, selectedStation, handleSheetChanges }) => {

  const [currentPosition, setCurrentPosition] = useState(1);
  const handleAnimate = useCallback((fromIndex, toIndex) => {
    if (fromIndex > toIndex && fromIndex === currentPosition) {
      handleSheetChanges(-1);
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
      onAnimate={handleAnimate}
      >
      { selectedStation ? (
        <PlaceComponent station={selectedStation} />
      ) : null }
    </BottomSheet>
  );
};

export default PlaceBottomSheetComponent;
