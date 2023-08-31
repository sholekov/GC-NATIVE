import global from '@/assets/styles/styles';
import faqs from '@/assets/styles/faqs';
const styles = { ...global, ...faqs };

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Stack } from 'expo-router';

// Components
import BackButton from '@/app/(components)/stackBackButton';

const FAQsScreen = () => {
  const { t, i18n } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqData = [
    {
      question: 'What is an electric vehicle charging station?',
      answer: 'An electric vehicle charging station is a location equipped with charging equipment to recharge electric vehicles (EVs).',
    },
    {
      question: 'How do I find charging stations using the app?',
      answer: 'Open the app and use the search feature to find nearby charging stations. You can also filter by station type and charging speed.',
    },
    {
      question: 'Do I need an account to use the charging stations?',
      answer: 'Yes, you need to create an account in the app to start using the charging stations. This allows you to track your usage and make payments.',
    },
    {
      question: 'What types of charging connectors are supported?',
      answer: 'Our charging stations support a variety of connectors, including Type 1, Type 2, CHAdeMO, and CCS (Combo). Make sure your EV is compatible with the station connector.',
    },
    {
      question: 'How do I start a charging session?',
      answer: 'After locating a station, simply tap "Start Charging" on the app. Plug in your vehicle and the charging session will begin. You can monitor the progress in the app.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept major credit and debit cards for payment. You can also link your app account to an online payment service.',
    },
    {
      question: 'Is the charging station network interoperable?',
      answer: 'Yes, our charging stations are part of a larger network that supports cross-network charging. You can use your app account to charge at compatible stations.',
    },
    {
      question: 'How do I report a problem with a charging station?',
      answer: 'If you encounter an issue with a station, you can report it through the app. Our support team will address the problem as soon as possible.',
    },
    {
      question: 'Is there a membership program available?',
      answer: 'Yes, we offer a membership program that provides discounts on charging rates and exclusive benefits. You can learn more about it on our website.',
    },
    {
      question: 'What happens if my charging session is interrupted?',
      answer: 'In case of an interruption, the charging session will pause. You\'ll receive notifications in the app.You can resume the session when the issue is resolved.',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: t('more.faqs.page-title'),
        headerLeft: () => <BackButton />,
      }} />

      <View style={styles.container}>
        {faqData.map((faq, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqItem}
            onPress={() => toggleFAQ(index)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
              <Text style={styles.question}>{faq.question}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 0, right: 0, padding: 0, height: '100%', backgroundColor: 'transparent', }}>
                <Icon
                  name={activeIndex === index ? 'chevron-down' : 'chevron-right'}
                  size={16}
                  color={'#333'}
                  style={{ marginLeft: 8, }}
                />
              </View>
            </View>

            {activeIndex === index && <Text style={styles.answer}>{faq.answer}</Text>}
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default FAQsScreen;
