import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { store, setAppUILanguage } from '@/store'

const LanguagesScreen = () => {
  const { t, i18n } = useTranslation();
  const { language } = useSnapshot(store)
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Bulgarian', value: 'bg' },
  ];
  const [selectedLang, setLang] = useState(language);

  useEffect(() => {
    setAppUILanguage(selectedLang, i18n);
  }, [selectedLang]);

  const LangItem = ({ item }) => {
    return (
    <View style={{...styles.item}}>
      <Icon 
        name='check-square'
        size={18}
        color={'#333'}
        style={{ marginRight: 8, }}
      />
      <Text style={{ color: '#333', fontWeight: '500', }}>{item.label}</Text>
    </View>)
  }
  const SelectedLangItem = ({ item }) => {
    return (<TouchableOpacity onPress={() => setLang(item.value)} style={styles.item}>
      <Icon 
        name='square'
        size={18}
        color={'#555'}
        style={{ marginRight: 8, }}
      />
      <Text style={{ color: '#555', fontWeight: '500', }}>{item.label}</Text>
    </TouchableOpacity>)
  }

  return (
    <View style={styles.container}>

      <View style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
        <Icon 
          name='globe'
          size={24}
          color={'#333'}
          style={{ marginRight: 8, }}
        />
        <Text style={styles.title}>
          {t('settingsNamespace.changeLanguage.title')}
        </Text>
      </View>

      <FlatList
        data={languages}
        renderItem={({ item }) => item.value == selectedLang ? <LangItem item={item} /> : <SelectedLangItem item={item} />}
        keyExtractor={item => item.value}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
  },
  snippet: {
    fontSize: 16,
    color: '#666',
  },
});

export default LanguagesScreen;
