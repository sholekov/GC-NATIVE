//import liraries
import React, { Component, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Modal, Pressable, Alert, TouchableOpacity } from 'react-native';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Pressable, Alert, Modal, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { launchImageLibraryAsync, MediaTypeOptions, launchCameraAsync, useCameraPermissions, PermissionStatus, } from 'expo-image-picker'
import Constants from 'expo-constants';

// Components
import ChooseMediaSourceModal from '@/app/pages/account/details/chooseMediaSourceModal'
const ImagePlaceholder = ({ image }) => {
  return (<View style={{ alignSelf: 'center', marginBottom: 32, width: 190, height: 190, }}>
    <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 999, }} />
  </View>)
}
const ConfirmModal = ({ modalVisible, setModalVisible, image, onConfirm, onCancel }) => {
  const styles = StyleSheet.create({
    actionBtn: {
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      marginHorizontal: 4,
      paddingVertical: 12,
      width: '30%',
      backgroundColor: 'silver',
      borderRadius: 12,
    },
    actionBtnText: {
      color: 'white', fontWeight: '600',
    },
    actionBtnTextConfirm: {
      backgroundColor: '#3c8f09',
    },
  });

  return (<>
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>

        <ImagePlaceholder image={image} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32, }}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
              onCancel();
            }}
            style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setModalVisible(false);
              onConfirm();
            }}
            style={[styles.actionBtn, styles.actionBtnTextConfirm]}>
            <Text style={styles.actionBtnText}>Confirm</Text>
            {/* <Icon name="check-circle" size={20} color={'#33333330'} solid style={{ marginLeft: 8, }}></Icon> */}
          </Pressable>
        </View>

      </View>
    </Modal>
  </>)
}

import { store } from '@/store'
import { uploadImageToServer, setLocalUser } from '@/helpers'
import { useSnapshot } from 'valtio';

const UserPhotoComponent = () => {
  const { user } = useSnapshot(store)
  const [modalVisible, setModalVisible] = useState(false);

  const [pickedImage, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission,] = useCameraPermissions();
  async function verifyPermission() {
    // Ask the user for the permission to access the camera
    const permissionResponse = await requestPermission();
    if (permissionResponse.status === PermissionStatus.GRANTED) {
      return true
    }

    if (permissionResponse.canAskAgain === false) {
      Alert.alert(
        'Camera access denied',
        'You need to grant camera access on the settings to use this app'
      );
      return false
    }

    if (permissionResponse.status === PermissionStatus.UNDETERMINED) {
      Alert.alert(
        'Camera access denied',
        'Permission Status for Camera access is UNDETERMINED'
      );
      return false
    } else if (permissionResponse.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Camera access denied',
        'You need to grant camera access on the settings to use this app'
      );
      return false
    }
    return false
  }
  const openCamera = async () => {
    const status = await verifyPermission()

    if (!status) {
      return
    }
    
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setSelectedImage(result.assets[0]);
      setImage(uri);
    }
  }
  async function captureImage() {
    await openCamera()
    setModalVisible(false)
  }

  const pickFromGallery = async () => {
    setModalVisible(false)
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setSelectedImage(result.assets[0]);
      setImage(uri);
    }
  };
  
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  useEffect(() => {
    if (pickedImage) {
      setShowConfirmModal(true)
    }
  }, [pickedImage])

  return (
    <>
      <View style={{ ...styles.photo_container, marginBottom: 12, }}>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: 999, }}>
          {
            (user.image && !pickedImage) ? (
              <ImagePlaceholder image={user.image} />
            ) :
              pickedImage ? (
                <Image source={{ uri: pickedImage }} style={{ width: '100%', height: '100%', borderRadius: 999, }} />
              ) :
                (
                  <Icon name="user-circle" solid style={{ fontSize: 148, opacity: .5, }}></Icon>
                )
          }
          <View style={styles.cameraBtnWrapper}>
            {
              pickedImage ?
                <Icon name="check-circle" size={20} color={'#33333330'} solid style={styles.cameraBtn}></Icon> :
                <Icon name="camera" size={20} color={'#333'} solid style={styles.cameraBtn}></Icon>
            }
          </View>
        </TouchableOpacity>

      </View>
      <ChooseMediaSourceModal modalVisible={modalVisible} setModalVisible={setModalVisible} choices={{ pickFromGallery, captureImage }} />
      {showConfirmModal && <ConfirmModal modalVisible={showConfirmModal} setModalVisible={setShowConfirmModal} image={pickedImage} onConfirm={() => uploadImageToServer(selectedImage, user.csrf)} onCancel={() => setImage(null)} />}
    </>
  )
}

const styles = StyleSheet.create({
  photo_container: {
    position: 'relative',
    width: 156, height: 156,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBtnWrapper: {
    position: 'absolute', bottom: 0, right: 0,
    padding: 10,
    borderRadius: 333,
    backgroundColor: '#fff', borderColor: '#000', borderWidth: 0,
  },
  cameraBtn: {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default UserPhotoComponent;
