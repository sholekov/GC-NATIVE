
import { useStripe } from '@stripe/stripe-react-native';

const CheckoutScreen = ({ amount, type, setConfirmAmount }) => {
  const { t } = useTranslation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('amount', amount);
    console.log('type', type);
    if (amount === '') {
      setConfirmAmount(false);
      return;
    }

    initializePaymentSheet()
      .then((error) => {
        console.log('error', error);
        if (!error) { 
          openPaymentSheet();
        } else {
          Alert.alert('Error', 'Please try again.');
          setConfirmAmount(false);
        }
      })
  }, [amount]);


  // const { handleURLCallback } = useStripe();

  // const handleDeepLink = useCallback(
  //   async (url: string | null) => {
  //     if (url) {
  //       const stripeHandled = await handleURLCallback(url);
  //       if (stripeHandled) {
  //         // This was a Stripe URL - you can return or add extra handling here as you see fit
  //       } else {
  //         // This was NOT a Stripe URL – handle as you normally would
  //       }
  //     }
  //   },
  //   [handleURLCallback]
  // );

  // useEffect(() => {
  //   const getUrlAsync = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     handleDeepLink(initialUrl);
  //   };

  //   getUrlAsync();

  //   const deepLinkListener = Linking.addEventListener(
  //     'url',
  //     (event: { url: string }) => {
  //       handleDeepLink(event.url);
  //     }
  //   );

  //   return () => deepLinkListener.remove();
  // }, [handleDeepLink]);

  // 

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await axios(`http://localhost:4000/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ amount: parseFloat(amount), type: type }), // Send the amount to your backend
      });
      const { paymentIntent } = await response.data
      console.log('paymentIntent', paymentIntent);
      return {
        paymentIntent,
      };
    } catch (error) {
      console.error("Error occurred:", error.message);
      // You might also want to handle this error in a user-friendly manner, 
      // for instance showing a notification or a message in your UI.
      return { paymentIntent: null };
    }
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams();

    if (paymentIntent === null) {
      return { error: 'Failed to fetch the PaymentSheet params' }
    }
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      returnURL: 'gigacharger://home',
    });

    if (!error) {
      setLoading(true);
    }
    return error
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

// React
import React, { useCallback, useEffect, useState } from 'react';

// React Native
import { Alert, Text, Linking, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default CheckoutScreen;
