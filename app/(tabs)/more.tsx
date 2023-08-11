import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Pressable, ScrollView, Linking } from 'react-native';
import { Link, Redirect } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useSnapshot } from 'valtio'
import { store, setupUser } from '@/store'
import { toggleStationToFavourites, getFavouriteStations } from '@/helpers'

// Components
import Divider from '@/app/partials/divider'

const openURL = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    });
};
    

const MoreComponent = () => {

    return (
        <SafeAreaView style={{ flex: 1, }}>
        <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 32 }}>
            <View style={{ ...styles.btns_container, paddingTop: 14, }}>
                <Text style={{ fontSize: 28, fontWeight: '500', textAlign: 'center', }}>Gigacharger</Text>
            </View>

            <View style={styles.btns_container}>
                <TouchableOpacity onPress={() => openURL(`https://gigacharger.net/install-request/`)}>
                    <View style={{...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom}}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='charging-station'
                                size={18}
                                color={'#333'}
                            />
                            <Text style={styles.btn_container.textWrapper.text}>Заявка за инсталация</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.btns_container}>
                <Link href='/news' asChild>
                    <Pressable>
                    <View style={{...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom}}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='newspaper'
                                size={18}
                                color={'#333'}
                            />
                            <Text style={styles.btn_container.textWrapper.text}>Новини и обновления</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                    </Pressable>
                </Link>
            </View>


            <View style={styles.btns_container}>
                <TouchableOpacity onPress={() => openURL(`https://gigacharger.net/about-us/`)}>
                    <View style={{...styles.btn_container, ...styles.roundedTop, }}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='info-circle'
                                size={18}
                                color={'#333'}
                            />
                            <Text style={styles.btn_container.textWrapper.text}>За нас</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                </TouchableOpacity>
                <Divider />
                <Link href='/faqs' asChild>
                    <Pressable>
                    <View style={{...styles.btn_container, }}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='question-circle'
                                size={18}
                                color={'#333'}
                                solid
                            />
                            <Text style={styles.btn_container.textWrapper.text}>Често задавани въпроси</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                    </Pressable>
                </Link>
                <Divider />
                <TouchableOpacity onPress={() => openURL(`https://gigacharger.net/contacts/`)}>
                    <View style={{...styles.btn_container, ...styles.roundedBottom}}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='headset'
                                size={18}
                                color={'#333'}
                            />
                            <Text style={styles.btn_container.textWrapper.text}>Обратна връзка</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.btns_container}>
                <Link href='/how-work' asChild>
                    <Pressable>
                    <View style={{...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom}}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='file-alt'
                                size={18}
                                color={'#333'}
                            />
                            <Text style={styles.btn_container.textWrapper.text}>Упътване за работа</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                    </Pressable>
                </Link>
            </View>



            <View style={styles.btns_container}>
                <TouchableOpacity onPress={() => openURL(`https://gigacharger.net/terms-and-conditions/`)}>
                    <View style={{...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom}}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='file-contract'
                                size={18}
                                color={'#333'}
                            />
                            <Text style={styles.btn_container.textWrapper.text}>Условия за ползване</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{
                    marginVertical: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>* * *</Text>
            </View>



            <View style={styles.btns_container}>
                <Link href='/languages' asChild>
                    <Pressable>
                    <View style={{...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom}}>
                        <View style={styles.btn_container.textWrapper}>
                            <Icon 
                                name='globe'
                                size={18}
                                color={'#333'}
                            />
                            <Text style={styles.btn_container.textWrapper.text}>Език</Text>
                        </View>
                        <Icon
                            name='chevron-right'
                            size={18}
                            color={'grey'}
                            />
                    </View>
                    </Pressable>
                </Link>
            </View>



        </ScrollView>
        </SafeAreaView>
    );
};

export default MoreComponent;
