import React from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

import Place from '@/app/partials/(tabs)/(place)'

const PlaceComponent = ({ placeSheetRef, selectedStation, callback }) => {
  return (
    <BottomSheet
      ref={placeSheetRef}
      index={-1}
      snapPoints={['75%', '90%']}
      enablePanDownToClose={true}
      onClose={ () => callback() } >
      { selectedStation ? (
        <Place station={selectedStation}></Place>
      ) : null }
    </BottomSheet>
  );
};

export default PlaceComponent;
