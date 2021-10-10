import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Platform, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import TopTabNavigation from '../Navigation/TopTabNavigation'
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Components/Header'
import { Loader } from '../Components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { check, PERMISSIONS, RESULTS, request, requestMultiple, checkMultiple } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { AddNewMoive } from '../Integration/api/ApisFunctions';
import { Error } from '../Components/Erorr';
import {
    saveError,
} from '../Integration/actions/Actions';
var RNFS = require('react-native-fs');

const options = {
    title: 'Add image to gallery',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};






const All = ({ navigation }) => {
    const dispatch = useDispatch();
    const generalState = useSelector(state => state.generalReducer)
    const presistState = useSelector(state => state.presistReducer)
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [overview, setoverview] = useState('')
    const [modal, setModal] = useState(false)
    const verifyPermissions = async (param) => {
        if (Platform.OS == 'ios') {
            //  <key>NSPhotoLibraryUsageDescription</key>
            // <string>$(PRODUCT_NAME) would like access to your photo gallery</string>
            // <key>NSCameraUsageDescription</key>
            // <string>$(PRODUCT_NAME) would like to use your camera</string>
            // <key>NSPhotoLibraryAddUsageDescription</key>

            checkMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.CAMERA])
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)',
                            );
                            break;
                        case RESULTS.DENIED:
                            console.log(
                                'The permission has not been requested / is denied but requestable',
                            );
                            requestMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.CAMERA]).then(() => {
                                console.log('Hello in if ')
                                verifyPermissions()

                            })
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            addImage(param)
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });
        }
        else {

            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
                .then((result) => {
                    console.log("result", result['android.permission.CAMERA'], result['android.permission.WRITE_EXTERNAL_STORAGE'])

                    if (result['android.permission.CAMERA'] == 'denied' || result['android.permission.WRITE_EXTERNAL_STORAGE'] == 'denied') {
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                        );
                        requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
                            .then(() => {
                                verifyPermissions()
                            })
                    }
                    else if (result['android.permission.CAMERA'] == 'granted' && result['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted') {
                        console.log('The permission is granted');
                        addImage(param)
                    }
                })
                .catch((error) => {
                    // …
                });
        }

    }

    const addImage = (param) => {
        console.log("param===>", param)
        if (param == "camera") {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(async image => {
                console.log("image==>", image);
                const resizedImageUrl = await ImageResizer.createResizedImage(
                    image.path,
                    500,
                    500,
                    'JPEG',
                    100,
                    0,
                );
                const base64 = await RNFS.readFile(resizedImageUrl.path, 'base64');
                setImage(base64)
                data = {
                    image: base64,
                    file_name: image.fileName ? image.fileName : ('File_name' + Math.floor(Math.random() * 99999))
                }

            });
        }
        else if (param == "gallery") {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(async image => {
                console.log("image==>", image);
                const resizedImageUrl = await ImageResizer.createResizedImage(
                    image.path,
                    500,
                    500,
                    'JPEG',
                    100,
                    0,
                );

                const base64 = await RNFS.readFile(resizedImageUrl.path, 'base64');
                setImage(base64)


            });
        }

    }

    const addMovie = () => {

        if (title != "" && overview != "") {

            let temp = []
            if (presistState.data.MyMovies) {
                temp = [...presistState.data.MyMovies]
            }
            let data = {
                title: title,
                overview: overview,
                image: image
            }
            temp.unshift(data)
            dispatch(AddNewMoive(temp, navigation))
        }
        else {
            dispatch(saveError("AddNewMoive", "please fill all required fields"))
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", alignItems: "center" }}>
            <ScrollView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", }}
                showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, alignItems: "center" }}>

            </ScrollView>
        </SafeAreaView>
    );
}

export default All;

const styles = StyleSheet.create({
    selectModal: {
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        height: calcHeight(326),
        width: "100%",
        borderTopLeftRadius: calcHeight(10),
        borderTopRightRadius: calcHeight(10),
    },
    selectModalFristRow: {
        backgroundColor: "#00000014",
        height: calcHeight(53),
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: calcHeight(16)
    },
    selectModalText: {
        color: "#1C254B",
        fontSize: calcWidth(16),
        fontFamily: AppStyles.Fonts.Regular,
        marginLeft: calcWidth(25)

    },
    selectModalFristRowComponent: {
        backgroundColor: "#CFD0D2",
        width: calcWidth(24),
        height: calcHeight(2),
        marginLeft: calcWidth(77.5)
    },
    modalTouchable: {
        marginBottom: calcHeight(10)
    },
    input: {
        borderBottomColor: AppStyles.Color.LIGHT_GRAY,
        width: '90%',
        backgroundColor: '#fff',
        marginBottom: calcHeight(30),
        color: AppStyles.Color.TEXT_GRAY,
        fontSize: calcWidth(14),
        fontFamily: AppStyles.Fonts.Regular,
        borderBottomWidth: calcHeight(1)
    },
    imageTouchable: {
        borderStyle: "dashed",
        borderColor: "#ABABAB",
        borderWidth: 1,
        height: calcHeight(120),
        width: calcWidth(160),
        borderRadius: calcHeight(15),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: calcHeight(12)

    },
    touchable: {
        height: calcHeight(60),
        width: calcHeight(200),
        borderRadius: calcHeight(12),
        backgroundColor: AppStyles.Color.DARK_THEM,
        justifyContent: "center",
        alignItems: "center",
        marginTop: calcHeight(20)
    },
    touchableText: {
        color: "#fff",
        fontSize: calcWidth(16),
        fontFamily: AppStyles.Fonts.Regular,
    },
    image: {
        width: calcWidth(275),
        height: calcHeight(275),
        alignSelf: "center",
        marginVertical: calcHeight(35)
    },
})