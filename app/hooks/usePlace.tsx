import { useRef, useState } from 'react';

import PlaceComponent from '@/app/hooks/components/placeComponent'

export const usePlace = () => {

  const [selectedStation, setSelectedStation] = useState(null);
  
  const placeSheetRef = useRef(null);

  return { PlaceComponent, placeSheetRef, selectedStation, setSelectedStation };
};
