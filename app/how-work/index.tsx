import global from '@/assets/styles/styles';
import guide from '@/assets/styles/guide';
const styles = { ...global, ...guide };

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import { Stack } from 'expo-router';

// Components
import BackButton from '@/app/(components)/stackBackButton';

const FAQsScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: t('more.guide.page-title'),
        headerLeft: () => <BackButton />,
      }} />

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Finding Charging Stations</Text>
        <Text style={styles.sectionText}>
          Use the app to locate nearby charging stations. Filter by connector type and charging speed to find the station that suits your needs.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Starting a Charging Session</Text>
        <Text style={styles.sectionText}>
          To start a charging session, tap "Start Charging" on the app. Plug in your electric vehicle and the charging will begin automatically.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Payment and Billing</Text>
        <Text style={styles.sectionText}>
          We accept major credit and debit cards. Your billing information is securely stored, and you'll receive a receipt after each session.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Charging Interruptions</Text>
        <Text style={styles.sectionText}>
          If a charging session is interrupted, the app will notify you. You can resume the session when the issue is resolved.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Membership Benefits</Text>
        <Text style={styles.sectionText}>
          Consider joining our membership program for discounted charging rates and exclusive perks. Learn more on our website.
        </Text>
      </View>

      <Text style={styles.footer}>For more information and support, contact our customer service at support@example.com</Text>

    </View>
  );
};

export default FAQsScreen;
