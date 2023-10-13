
import React, { useCallback, useEffect, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { Alert, Text, Linking, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';
const CheckoutScreen = ({amount, type, setConfirmAmount}) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log('amount', amount);
    console.log('type', type);
    if (amount === '') {
      setConfirmAmount(false);
      return;
    }

    initializePaymentSheet()
      .then( () => {
        openPaymentSheet();
      })
  }, [amount]);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  // 

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://localhost:4000/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseFloat(amount), type: type }), // Send the amount to your backend
    });

    // console.log('response', response);

    const { paymentIntent } = await response.json();

    console.log('paymentIntent', paymentIntent);
    return {
      paymentIntent,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      returnURL: 'gigacharger://home',
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      if (error.code === 'Canceled') {
        // Alert.alert(`${error.message}`, `Please try again.`)
        setConfirmAmount(false);
      } else __DEV__ ? Alert.alert(`Error code: ${error.code}`, error.message) : console.log('error', error);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      // redirect to home
      // code here
    }
  };

  return <View><Text style={{ opacity: 0 }}>{t('deposit.label-send-payment')}</Text></View>;
}

{/* <View>
  <TouchableOpacity onPress={openPaymentSheet} style={localStyles.confirmButton}>
    <Text style={{ color: '#fff' }}>{t('deposit.label-send-payment')}</Text>
  </TouchableOpacity>
</View> */}

export default CheckoutScreen;

const localStyles = StyleSheet.create({
  confirmButton: {
    marginBottom: 18,
    padding: 16,
    backgroundColor: '#5dac30',
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
