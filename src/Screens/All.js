import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity,
    RefreshControl, ImageBackground, TextInput
} from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import { useSelector, useDispatch } from 'react-redux';
import { Error } from '../Components/Erorr';
import { Succes } from '../Components/Succes';
import { GetAllTasks, AddNewTask } from '../Integration/api/ApisFunctions';
import { Card } from '../Components/Card';
import { Loader } from '../Components/Loader';
import Add from '../Assets/Svgs/Add';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Icon3 from 'react-native-vector-icons/Ionicons';
import {
    saveError,
    saveSuccess
} from '../Integration/actions/Actions';

const All = ({ navigation }) => {
    const dispatch = useDispatch();
    const generalState = useSelector(state => state.generalReducer)
    const presistState = useSelector(state => state.presistReducer)
    const [refreshing, setRefreshing] = useState(false);
    const [data, setdata] = useState(null)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [modal, setModal] = useState(false)
    const [doneModal, setdoneModal] = useState(false)

    useEffect(() => {
        dispatch(GetAllTasks())
    }, [])

    useEffect(() => {
        if (generalState.data.GetAllTasks) {
            setdata(generalState.data.GetAllTasks)
        }
    }, [generalState])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setdata(null)
        dispatch(GetAllTasks())
        setTimeout(() => setRefreshing(false), 1000)
    }, [refreshing]);

    const addTask = async () => {

        if (title != "" && desc != "") {
            let body = {
                name: title,
                description: desc,
                isDone: false
            }
            dispatch(AddNewTask(body))
            dispatch(saveSuccess("AddNewTask", " Task added successfully"))
        }
        else {
            dispatch(saveError("AddNewTask", "please fill all required fields"))

        }


    }
    const addTaskLocal = async () => {

        if (title != "" && desc != "") {
            let temp = []
            if (generalState.data.GetAllTasks) {
                temp = [...generalState.data.GetAllTasks]
            }
            let body = {
                name: title,
                description: desc,
                isDone: false
            }
            temp.unshift(body)
            setdata(temp)
        }
        else {
            dispatch(saveError("AddNewTask", "please fill all required fields"))

        }


    }

    return (
        <SafeAreaView style={{ height: "100%", width: "100%", alignItems: "center", flex: 1 }}>
            {generalState.Loading.GetAllTasks && <Loader />}
            {generalState.Errors.AddNewTask && <Error error={generalState.Errors.AddNewTask} />}
            {generalState.Success.AddNewTask && <Succes message={generalState.Success.AddNewTask} />}
            {data != null &&
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[AppStyles.Color.TEXT_BLUE]}
                            progressViewOffset={calcHeight(100)}
                        />
                    }

                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%", }}
                    contentContainerStyle={{ paddingBottom: calcHeight(50), paddingTop: calcHeight(20), alignItems: "center" }}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <Card item={item} />
                        )
                    }}
                />
            }

            <TouchableOpacity style={styles.Touchable} onPress={() => {
                setModal(true)
            }}>
                <Icon name="add" color="#fff" size={calcHeight(25)} />
                <Text style={styles.TouchableText}>Create Task</Text>
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
                <View style={styles.selectModal}>
                    <ImageBackground source={require("../Assets/Images/bg2.png")} style={styles.image}
                    //  resizeMode="cover"
                    >
                        <Text style={styles.modalTitle}>Create a new task</Text>
                        <TextInput

                            onChangeText={(value) => setTitle(value)}
                            placeholder={"Title"}
                            placeholderTextColor={AppStyles.Color.WHITE}
                            style={styles.input}
                            multiline

                        />

                        <TextInput

                            onChangeText={(value) => setDesc(value)}
                            placeholder={"Descreption"}
                            placeholderTextColor={AppStyles.Color.WHITE}
                            style={styles.input}
                            multiline

                        />

                        <TouchableOpacity style={[styles.Touchable, {
                            backgroundColor: "#fff"
                            , position: "absolute", bottom: calcHeight(36)
                        }]} onPress={() => {
                            // addTask()
                            addTaskLocal()
                            setModal(false)
                        }}>
                            <Icon name="add" color={AppStyles.Color.TEXT_BLUE} size={calcHeight(25)} />
                            <Text style={[styles.TouchableText, { color: AppStyles.Color.TEXT_BLUE }]}>Create Task</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

            </Modal>



        </SafeAreaView>
    );
}

export default All;

const styles = StyleSheet.create({
    Touchable: {
        height: calcHeight(56),
        width: calcWidth(170),
        backgroundColor: "#2F58E2",
        borderRadius: calcHeight(20),
        shadowColor: "#2F58E266",
        shadowOffset: {
            width: 3,
            height: 6,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        elevation: 8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        marginBottom: calcHeight(36),

    },
    TouchableText: {
        fontSize: calcWidth(18),
        fontFamily: AppStyles.Fonts.Regular,
        color: "#fff",
    },
    selectModal: {
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        height: calcHeight(380),
        width: "100%",
        borderRadius: calcHeight(30)
    },
    image: {
        height: "100%",
        width: "100%",
        flex: 1,
    },
    input: {
        borderBottomColor: AppStyles.Color.WHITE,
        width: '90%',
        marginBottom: calcHeight(30),
        marginHorizontal: calcWidth(22),
        color: AppStyles.Color.WHITE,
        fontSize: calcWidth(14),
        fontFamily: AppStyles.Fonts.Regular,
        borderBottomWidth: calcHeight(1)
    },
    modalTitle: {
        color: AppStyles.Color.WHITE,
        fontSize: calcWidth(26),
        fontFamily: AppStyles.Fonts.Regular,
        marginLeft: calcWidth(22),
    },


})