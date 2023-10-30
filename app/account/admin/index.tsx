

const AdminComponent = () => {
  const { t } = useTranslation();

  return (
    <>
    <Stack.Screen options={{
      title: t('account.tabLabels.details'),
      headerLeft: () => <BackButton />,
    }} />

    <View style={styles.container}>
      <Text>AdminComponent</Text>
    </View>
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

import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Redirect, Link, Stack, } from 'expo-router';
import { } from 'react-i18next';

// Components
import BackButton from '@/app/(components)/stackBackButton';

// Others
import { useTranslation } from 'react-i18next';

export default AdminComponent;
