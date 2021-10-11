import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { calcHeight, calcWidth } from '../Config/Dimension'
import AppStyles from '../Config/styles'
import Close from '../Assets/Svgs/Close'
import { useSelector, useDispatch } from 'react-redux';
import { UpdateTask, DeleteTask, FilterTasks } from '../Integration/api/ApisFunctions';
import {
    saveResponseGeneral,
    saveSuccess
} from '../Integration/actions/Actions';
import { Succes } from '../Components/Succes';


export const Card = (props) => {
    const dispatch = useDispatch();
    const generalState = useSelector(state => state.generalReducer)
    const presistState = useSelector(state => state.presistReducer)

    const updateTask = () => {
        let body = {
            id: props.item.id,
            isDone: !props.item.isDone
        }
        //dispatch(UpdateTask(body))

        if (generalState.data.GetAllTasks) {
            console.log("before update ==>", generalState.data.GetAllTasks)

            let temp = [...generalState.data.GetAllTasks]
            let updatedData = temp.map(x => (x.id === props.item.id ? { ...x, isDone: !props.item.isDone } : x));
            console.log("afteer update ==>", generalState.updatedData)
            dispatch(saveResponseGeneral(updatedData, "GetAllTasks"));
            dispatch(FilterTasks(updatedData))
        }
        //  dispatch(saveSuccess("UpdateTask", " Task Updated successfully"))


    }


    const deleteTask = () => {
        let body = {
            id: props.item.id,
        }
        // dispatch(DeleteTask(body))

        if (generalState.data.GetAllTasks) {

            console.log("before delete ==>", generalState.data.GetAllTasks)
            let temp = [...generalState.data.GetAllTasks]
            temp.splice(props.item.id, 1)
            console.log("after delete ==>", temp)
            dispatch(saveResponseGeneral(temp, "GetAllTasks"));
            dispatch(FilterTasks(temp))
        }

    }


    return (
        <TouchableOpacity
            onPress={() => {
                //props.aisha("heeeeeeeeeeeeeeey")
                updateTask()
            }}

            style={styles.card}>
            <View style={[styles.notification, { backgroundColor: props.item.isDone ? AppStyles.Color.GREEN : AppStyles.Color.RED }]} />
            <View style={{ marginLeft: calcWidth(18) }}>
                <Text style={[styles.taskName, {
                    textDecorationLine: props.item.isDone ? 'line-through' : null,
                    textDecorationStyle: props.item.isDone ? 'solid' : null
                }]} numberOfLines={2}>
                    {props.item.name}
                </Text>
                <Text style={styles.taskDesc} numberOfLines={1}>
                    {props.item.description}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => deleteTask()}
                style={styles.close}>
                <Close />
            </TouchableOpacity>
            {generalState.Success.UpdateTask && <Succes message={generalState.Success.UpdateTask} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: calcHeight(135),
        width: calcWidth(325),
        backgroundColor: "#fff",
        borderRadius: calcHeight(32),
        shadowColor: "#E0E3EB91",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 6,
        alignSelf: "center",
        flexDirection: "row",
        padding: calcWidth(22),
        alignItems: "center",
        marginBottom: calcHeight(20)

    },
    notification: {
        height: "100%",
        width: calcWidth(2),
        borderRadius: calcHeight(3),
    },
    taskName: {
        fontSize: calcWidth(22),
        fontFamily: AppStyles.Fonts.Regular,
        color: AppStyles.Color.TEXT_BLUE,
        maxWidth: calcWidth(200)
    },
    taskDesc: {
        fontSize: calcWidth(18),
        fontFamily: AppStyles.Fonts.Regular,
        color: AppStyles.Color.TEXT_GRAY,
        marginTop: calcHeight(4),
        maxWidth: calcWidth(220)
    },
    close: {
        position: "absolute",
        right: calcWidth(22)
    }
})

