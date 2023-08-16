import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const ChooseMediaSourceModal = ({ modalVisible, setModalVisible, choices: { pickFromGallery, captureImage } }) => {

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32, }}>

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

        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </Pressable>
      </View>
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
    // backgroundColor: 'brown',
    borderColor: 'brown',
    borderWidth: 1,
    borderRadius: 12,
  },
  cancelBtnText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: 'brown',
    fontWeight: '600',
  }
});

export default ChooseMediaSourceModal;
