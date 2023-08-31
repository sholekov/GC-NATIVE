
import globalStyles from '@/assets/styles/styles';
import languagesStyles from '@/assets/styles/languages';
const styles = { ...globalStyles, ...languagesStyles };

import languages from '@/assets/languages.json';

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store, setAppUILanguage } from '@/store'
import { Stack } from 'expo-router';

// Components
import BackButton from '@/app/(components)/stackBackButton';

const LanguagesScreenComponent = () => {
  const { t, i18n } = useTranslation();
  const { language } = useSnapshot(store)

  const [_langs, setLangs] = useState([]);
  useEffect(() => {
    const _languages: Object[] = []
    Object.keys(languages).forEach(locale => {
      _languages.push({ label: languages[locale], value: locale })
    });
    setLangs(_languages)
  }, []);
  const [selectedLang, setLang] = useState(language);

  useEffect(() => {
    setAppUILanguage(selectedLang, i18n);
  }, [selectedLang]);

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
    </View>) : (<TouchableOpacity onPress={() => setLang(item.value)} style={styles.item}>
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
        data={_langs}
        renderItem={({ item }) => <LangItemComponent checked={item.value == selectedLang} item={item} />}
        keyExtractor={item => item.value}
      />

    </View>
  );
};

export default LanguagesScreenComponent;
