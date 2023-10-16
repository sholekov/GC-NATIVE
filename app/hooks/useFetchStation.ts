
import { useState, useEffect } from 'react';

import { fetchStation } from '@/helpers'

const useFetchStation = (station_id: number) => {
  const [data_station, setDataStation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStation( station_id.toString() )
      .then( (responce) => {
        setDataStation(responce.data.station);
        setLoading(false);
      })
      .catch( (error) => {
        console.log('error', error);
      })
  }, []);

  return { data_station, loading };
};

export default useFetchStation;
