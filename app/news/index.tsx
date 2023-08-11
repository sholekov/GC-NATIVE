// NewsOrUpdatesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const NewsOrUpdatesScreen = () => {
  // This would be fetched from a server in a real app
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch the news from a server
    setNews([
      { id: '1', title: 'Charging - Electric Vehicle News and Trends - InsideEVs', link: 'https://insideevs.com/news/category/charging/', snippet: 'Get breaking news, in-depth articles and press releases covering Charging in the EV industry. ... Tesla Supercharging Network: 318 Stations Added In Q2 2023.' },
      { id: '2', title: 'Latest News & Videos, Photos about ev charging stations | The Economic Times - Page 1', link: 'https://economictimes.indiatimes.com/topic/ev-charging-stations', snippet: 'ev charging stations Latest Breaking News, Pictures, Videos, and Special Reports from The Economic Times. ev charging stations Blogs, Comments and Archive ...' },
      { id: '3', title: 'A post-servo highway? How electric vehicles are changing the Australian roadscape - The Guardian', link: 'https://www.theguardian.com/environment/2023/jul/22/electric-vehicles-australia', snippet: 'EVs are heralding a new kind of driving culture, from friendly chats at charging stations to reshaping where and how long we stop on road ...' },
      { id: '4', title: 'EV Charging News - Latest News on Fast Charging, Range Anxiety and More - EVgo', link: 'https://www.evgo.com/news/', snippet: 'EVgo Fast Charging – People are talking! Click to read about EVgo, our 800+ EV fast charging stations, and the latest Electric Vehicle Charging industry news.' },
      { id: '5', title: 'All the news about EV charging in the US - The Verge', link: 'https://www.theverge.com/23758095/electric-vehicle-charging-news-nacs-ccs-tesla-supercharger-us-infrastructure', snippet: 'Find out by reading all the news about electric vehicle charging ... the news that Electrify America, the company\'s EV charging station ...' },
      // Add more news as needed
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News or Updates</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.link}>{item.link}</Text>
            <Text style={styles.snippet}>{item.snippet}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
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
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    marginBottom: 5,
  },
  snippet: {
    fontSize: 16,
    color: '#666',
  },
});

export default NewsOrUpdatesScreen;
