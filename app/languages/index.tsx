
import globalStyles from '@/assets/styles/styles';
import languagesStyles from '@/assets/styles/languages';
const styles = { ...globalStyles, ...languagesStyles };

import languages from '@/assets/languages.json';

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { Stack } from 'expo-router';

// Components
import BackButton from '@/app/(components)/stackBackButton';

import setupLanguage from '@/hooks/useSetupLanguage'

const LanguagesScreenComponent = () => {
  const { t, i18n } = useTranslation();
  const { languages, changeLanguage } = setupLanguage();

  const LangItem = ({ checked, item }) => {
    return (<>
      <Icon
        name={checked ? 'check-square' : 'square'}
        style={[styles.itemIcon, checked && styles.itemColorChecked]}
      />
      <Text style={[styles.itemText, checked && styles.itemColorChecked]}>{item.label}</Text>
    </>)
  }
  const LangItemComponent = ({ checked, item }) => {
    return checked ? (<View style={styles.item}>
      <LangItem checked={checked} item={item} />
    </View>) : (<TouchableOpacity onPress={() => changeLanguage(item.value)} style={styles.item}>
      <LangItem checked={checked} item={item} />
    </TouchableOpacity>)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: t('more.language.cta-label'),
        headerLeft: () => <BackButton />,
      }} />

      <View style={styles.containerHeader}>
        <Icon name='globe' style={styles.containerHeaderIcon} />
        <Text style={styles.page_title}>
          {t('settingsNamespace.changeLanguage.page-title')}
        </Text>
      </View>

      <FlatList
        data={languages}
        renderItem={({ item }) => <LangItemComponent checked={item.value == i18n.language} item={item} />}
        keyExtractor={item => item.value}
      />

    </View>
  );
};

export default LanguagesScreenComponent;
