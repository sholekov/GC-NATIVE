import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { router, } from 'expo-router';

import { useTranslation } from 'react-i18next';

const BackToMoneyComponent = () => {
  const { t } = useTranslation();

  return (
    <View style={{ paddingVertical: 32, }}>
      <View style={styles.btns_container}>
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#00000010', borderRadius: 8, }}>
          <Text style={{ padding: 16, textAlign: 'center', }}>{t('commonNamespace.close')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackToMoneyComponent;
