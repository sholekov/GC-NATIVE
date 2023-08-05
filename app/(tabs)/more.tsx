//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';


const MyComponent = () => {
    return (
        <View style={styles.container}>
            <Text>More</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyComponent;
