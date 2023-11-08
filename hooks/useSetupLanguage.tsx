import { Lang } from '@/types';
import constants from '@/constants.json';

import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';

const flags = {
  bg: require('@/assets/images/flags/tn_bg-flag.jpg'),
  en: require('@/assets/images/flags/tn_en-flag.jpg'),
  ro: require('@/assets/images/flags/tn_ro-flag.jpg'),
};

export default function setupLanguage() {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState<Lang>();
  const [languages, setLangs] = useState();

  useEffect(() => {
    const _languages: Object[] = []
    Object.keys(constants.LANGUAGES).forEach((locale: string) => {
      _languages.push({ label: constants.LANGUAGES[locale], value: locale })
    });
    _languages.sort((a, b) => a.label.localeCompare(b.label))
    setLangs(_languages)
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('appLanguage')
      .then((value) => {
        i18n.changeLanguage(value || i18n.language);
      })
  }, [])

  useEffect(() => {
    if (language) { 
      AsyncStorage.setItem('appLanguage', language)
      i18n.changeLanguage(language);
    }
  }, [language])

  const LangItem = ({ checked, item }) => {
    return (<View style={[styles.flagWrapper]}>
      <View style={[checked && styles.langChecked]}></View>
      <Image source={flags[item.value]}
        style={[styles.flag]}
      />
      <Text style={[styles.langLabel,]}>{item.label.split(' ')[0]}</Text>
    </View>)
  }
  const LangItemComponent = ({ checked = false, item }) => {
    return (<TouchableOpacity onPress={() => setLanguage(item.value)}>
      <LangItem checked={checked} item={item} />
    </TouchableOpacity>)
  }
  const LanguagesComponent = () => {
    return (
      <FlatList
        contentContainerStyle={styles.flagsWrapper}
        horizontal
        data={languages}
        renderItem={({ item }) => <LangItemComponent checked={item.value == language} item={item} />}
        keyExtractor={item => item.value}
    />
    )
  }

  return {
    flags,
    languages,
    language,
    changeLanguage: setLanguage,
    LanguagesComponent,
  };
}

import languagesStyles from '@/assets/styles/languages';
const styles = { ...languagesStyles };