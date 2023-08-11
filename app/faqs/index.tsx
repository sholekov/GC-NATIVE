import global from '@/assets/styles/styles';
const styles = { ...global, };

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const FAQsScreen = () => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>

      <View style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
        <Icon 
          name='globe'
          size={24}
          color={'#333'}
          style={{ marginRight: 8, }}
        />
        <Text>
          {t('moreNamespace.faqs.title')}
        </Text>
      </View>

    </View>
  );
};

export default FAQsScreen;
