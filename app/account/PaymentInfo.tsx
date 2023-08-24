import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import { useTranslation } from 'react-i18next';
const PaymentInfo = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('');

  const { t } = useTranslation();
  const handleScanCard = () => {
    // Implement card scanning functionality here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.page_title}>Add your payment information</Text>

      <Text style={styles.subTitle}>Card Information</Text>
      <View style={styles.inputGroup}>
        <FontAwesomeIcon name="credit-card" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Card number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="CVC"
          value={cvc}
          onChangeText={setCvc}
          keyboardType="numeric"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleScanCard} style={styles.scanButton}>
        <FontAwesomeIcon name="camera" size={20} />
        <Text>Scan Card</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Country</Text>
      <View style={styles.inputGroup}>
        <FontAwesomeIcon name="globe" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default PaymentInfo;
