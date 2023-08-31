import global from '@/assets/styles/styles';
import guide from '@/assets/styles/guide';
const styles = { ...global, ...guide };

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import { Stack } from 'expo-router';

// Components
import BackButton from '@/app/(components)/stackBackButton';

const PageTemplateScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: t('path.page-title'),
        headerLeft: () => <BackButton />,
      }} />

    </View>
  );
};

export default PageTemplateScreen;
