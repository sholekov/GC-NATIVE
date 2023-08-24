import global from '@/assets/styles/styles';
import page from '@/assets/styles/page';
const styles = { ...global, ...page };

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Pressable, ScrollView, Linking } from 'react-native';
import { Link, Redirect } from 'expo-router';

import Icon from 'react-native-vector-icons/FontAwesome5';

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


import { useTranslation } from 'react-i18next';
const MoreComponent = () => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 32 }}>
                <View style={{ ...styles.btns_container, paddingTop: 14, }}>
                    <Text style={{ fontSize: 28, fontWeight: '500', textAlign: 'center', }}>Gigacharger</Text>
                </View>

                <View style={{ ...styles.btns_container }}>
                    <TouchableOpacity onPress={() => openURL(`https://gigacharger.net/install-request/`)}>
                        <View style={{ ...styles.btn_container_warining }}>
                            <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom, }}>
                                <View style={styles.btn_container.textWrapper}>
                                    <Icon
                                        name='charging-station'
                                        size={18}
                                        color={'#333'}
                                    />
                                    <Text style={styles.btn_container.textWrapperText}>{t('more.install.cta-label')}</Text>
                                </View>
                                <Icon
                                    name='chevron-right'
                                    size={18}
                                    color={'grey'}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.btns_container}>
                    <Link href='/news' asChild>
                        <Pressable>
                            <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom }}>
                                <View style={styles.btn_container.textWrapper}>
                                    <Icon
                                        name='newspaper'
                                        size={18}
                                        color={'#333'}
                                    />
                                    <Text style={styles.btn_container.textWrapperText}>{t('more.news')}</Text>
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
                        <View style={{ ...styles.btn_container, ...styles.roundedTop, }}>
                            <View style={styles.btn_container.textWrapper}>
                                <Icon
                                    name='info-circle'
                                    size={18}
                                    color={'#333'}
                                />
                                <Text style={styles.btn_container.textWrapperText}>{t('more.about')}</Text>
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
                            <View style={{ ...styles.btn_container, }}>
                                <View style={styles.btn_container.textWrapper}>
                                    <Icon
                                        name='question-circle'
                                        size={18}
                                        color={'#333'}
                                        solid
                                    />
                                    <Text style={styles.btn_container.textWrapperText}>{t('more.faqs.cta-label')}</Text>
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
                        <View style={{ ...styles.btn_container, ...styles.roundedBottom }}>
                            <View style={styles.btn_container.textWrapper}>
                                <Icon
                                    name='headset'
                                    size={18}
                                    color={'#333'}
                                />
                                <Text style={styles.btn_container.textWrapperText}>{t('more.feedback')}</Text>
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
                            <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom }}>
                                <View style={styles.btn_container.textWrapper}>
                                    <Icon
                                        name='file-alt'
                                        size={18}
                                        color={'#333'}
                                    />
                                    <Text style={styles.btn_container.textWrapperText}>{t('more.guide.cta-label')}</Text>
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
                        <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom }}>
                            <View style={styles.btn_container.textWrapper}>
                                <Icon
                                    name='file-contract'
                                    size={18}
                                    color={'#333'}
                                />
                                <Text style={styles.btn_container.textWrapperText}>{t('more.terms')}</Text>
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
                    <Link href='languages' asChild>
                        <Pressable>
                            <View style={{ ...styles.btn_container, ...styles.roundedTop, ...styles.roundedBottom }}>
                                <View style={styles.btn_container.textWrapper}>
                                    <Icon
                                        name='globe'
                                        size={18}
                                        color={'#333'}
                                    />
                                    <Text style={styles.btn_container.textWrapperText}>{t('more.language.cta-label')}</Text>
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

                <View style={{ paddingVertical: 32, }}>
                    <Text style={{ textAlign: 'center', }}>{t("more.buildNumber")}: {Date.now()}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default MoreComponent;
