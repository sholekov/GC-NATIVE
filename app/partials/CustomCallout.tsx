import global from '@/assets/styles/styles';
const styles = { ...global, };

import React from 'react';
import { View, Text } from 'react-native';
import { Callout } from 'react-native-maps';

const CustomCalloutComponent = ({name, region}) => {
  return (
    <Callout tooltip={true} style={styles.customCallout}>
      <View style={styles.calloutContainer}>
          <View style={styles.calloutInnerContainer}>

            <Text style={styles.calloutHeader}>
              {name}
            </Text>

            <Text style={styles.calloutDescription}>
              {region}
            </Text>

          </View>
      </View>
  </Callout>
  );
};

export default CustomCalloutComponent;
