

import { useSnapshot } from 'valtio'
import { helpers, getMeter } from '@/helpers'

import { useLocalSearchParams } from 'expo-router';

const MeterComponent = () => {
  const params = useLocalSearchParams<{ q?: string }>();

  const { t } = useTranslation();
  const [meter, setMeter] = useState<any>(null);
  
  useEffect(() => {
    getMeter(params.station_id)
      .then((response) => {
        setMeter(response.data);
        console.log('getMeter', response.data);
      })
      .catch((error) => {
        console.log('getMeter error', error);
      })
  }, []);

  return (
    <>
    <Stack.Screen options={{
      title: t('account.tabLabels.meter'),
      headerLeft: () => <BackButton />,
    }} />

    {meter && (<View style={styles.container}>
      <Text>{t("more.meter-meter")} {t("station"), " #" + params.station_id}</Text>
      <Text>{ (meter[0].energy / 1000).toFixed(1) } {t("more.meter-period")} kWh</Text>
    </View>)}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Redirect, Link, Stack, } from 'expo-router';
import { } from 'react-i18next';

// Components
import BackButton from '@/app/(components)/stackBackButton';

// Others
import { useTranslation } from 'react-i18next';

export default MeterComponent;
