import global from '@/assets/styles/styles';
import news from '@/assets/styles/news';
const styles = { ...global, ...news };

// NewsOrUpdatesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import HTMLRender from 'react-native-render-html';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useSnapshot } from 'valtio'
import { helpers } from '@/helpers'
import { getArticles } from '@/store'

import { useTranslation } from 'react-i18next';
const NewsOrUpdatesScreen = () => {
  const { t } = useTranslation();
  const { axiosInstance } = useSnapshot(helpers)

  const openURL = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    });
  };

  const [news, setNews] = useState([]);
  const loadArticles = async () => {
    // Fetch the news from a server / https://gigacharger.net/wp-json/wp/v2/posts
    const response = await getArticles(axiosInstance)
    setNews(response.data);
  };
  useEffect(() => {
    loadArticles()
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>{t('more.news')}</Text> */}
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
              <Text style={styles.item_title}>{item.title.rendered}</Text>
            </View>
            <HTMLRender contentWidth={100} baseStyle={{ fontSize: 16 }} source={{ html: item.excerpt.rendered }} />
            <TouchableOpacity onPress={() => openURL(item.link)} style={styles.linkContainerPressable}>
              <Text style={styles.link}>{t('commonNamespace.see-more')}</Text>
              <Icon
                name='chevron-right'
                style={styles.linkIcon}
              />
            </TouchableOpacity>

          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NewsOrUpdatesScreen;
