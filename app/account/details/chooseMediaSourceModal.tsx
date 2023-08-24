import { useTranslation } from 'react-i18next';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const ChooseMediaSourceModal = ({ modalVisible, setModalVisible, choices: { pickFromGallery, captureImage } }) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
            <Icon name="chevron-left" size={23} color={'#333'} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

            <TouchableOpacity onPress={pickFromGallery} style={styles.chooseBtn}>
              <Icon name="image" solid style={styles.cameraIcon} />
              <View style={styles.chooseBtnTextWrapper}>
                <Text style={styles.chooseBtnText}>Pick from Gallery</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={captureImage} style={styles.chooseBtn}>
              <Icon name="camera" solid style={styles.cameraIcon} />
              <View style={styles.chooseBtnTextWrapper}>
                <Text style={styles.chooseBtnText}>Capture with Camera</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  chooseBtn: {
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 8,
    padding: 8,
    width: '40%',
    height: 162,
    backgroundColor: '#99999920',
    borderRadius: 12,
    // borderColor: '#000', borderWidth: 1,
  },
  chooseBtnTextWrapper: {
    // backgroundColor: 'red',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    width: '100%', height: 44,
  },
  chooseBtnText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cameraIcon: {
    marginBottom: 12,
    color: '#333',
    fontSize: 48,
  },
  cancelBtn: {
    position: 'absolute',
    top: 0,
    left: 0,

    paddingVertical: 10,
    paddingHorizontal: 12,

    // borderColor: 'brown',
    // borderWidth: 1,
  },
});

export default ChooseMediaSourceModal;
