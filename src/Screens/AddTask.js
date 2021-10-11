import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Platform, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../Components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { Error } from '../Components/Erorr';
import {
    saveError,
} from '../Integration/actions/Actions';







const AddTask = ({ navigation }) => {
    const dispatch = useDispatch();
    const generalState = useSelector(state => state.generalReducer)
    const presistState = useSelector(state => state.presistReducer)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [modal, setModal] = useState(false)


    const addMovie = () => {

        if (title != "" && desc != "") {

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
            dispatch(saveError("AddNewTask", "please fill all required fields"))
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", alignItems: "center" }}>
            <ScrollView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", }}
                showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, alignItems: "center" }}>
                {generalState.Errors.AddNewMoive && <Error error={generalState.Errors.AddNewTask} />}

                <View style={{ marginTop: calcHeight(50), width: "100%", alignItems: "center" }}>
                    <TextInput

                        onChangeText={(value) => setTitle(value)}
                        placeholder={"Title"}
                        placeholderTextColor={AppStyles.Color.TEXT_GRAY}
                        style={styles.input}
                        multiline

                    />

                    <TextInput

                        onChangeText={(value) => setoverview(value)}
                        placeholder={"Descreption"}
                        placeholderTextColor={AppStyles.Color.TEXT_GRAY}
                        style={styles.input}
                        multiline

                    />
                </View>


                <TouchableOpacity style={styles.touchable}
                    onPress={() => addMovie()}
                >
                    <Text style={styles.touchableText}>Add Moive</Text>

                </TouchableOpacity>
                <Modal
                    testID={'modal'}
                    isVisible={modal}
                    onBackdropPress={() => setModal(false)}
                    swipeDirection={['up',]}
                    backdropColor="rgba(0,0,0,0.3)"
                    backdropOpacity={0.8}
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    statusBarTranslucent={true}
                    useNativeDriver={true}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}>


                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddTask;

const styles = StyleSheet.create({

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

})