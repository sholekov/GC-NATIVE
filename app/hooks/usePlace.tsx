import { useRef, useState } from 'react';

import PlaceBottomSheetComponent from '@/app/hooks/components/placeBottomSheetComponent'

export const usePlace = () => {

  const [selectedStation, setSelectedStation] = useState(null);
  
  const placeSheetRef = useRef(null);

  return { PlaceBottomSheetComponent, placeSheetRef, selectedStation, setSelectedStation };
};
