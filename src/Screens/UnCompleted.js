import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Platform, FlatList, TextInput, RefreshControl } from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../Components/Card';
import { Loader } from '../Components/Loader';
import { Succes } from '../Components/Succes';
import {
    saveError,
    saveSuccess
} from '../Integration/actions/Actions';
const UnCompleted = ({ navigation }) => {
    const dispatch = useDispatch();
    const generalState = useSelector(state => state.generalReducer)
    const presistState = useSelector(state => state.presistReducer)
    const [data, setdata] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (generalState.data.UnComleted) {
            setdata(generalState.data.UnComleted)
        }
    }, [generalState])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setdata(null)
        if (generalState.data.UnComleted) {
            setdata(generalState.data.UnComleted)
        } setTimeout(() => setRefreshing(false), 1000)
    }, [refreshing]);

    return (
        <SafeAreaView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", alignItems: "center" }}>
            {generalState.Loading.GetAllTasks && <Loader />}
            {generalState.Success.UpdateTask && <Succes message={generalState.Success.UpdateTask} />}
            {generalState.Success.deleteTask && <Succes message={generalState.Success.deleteTask} />}

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
                    renderItem={({ item, index }) => {
                        return (
                            <Card item={item} message={(message) => {
                                console.log("from aishaaaaaa  ==>", message)
                                if (message == "updateTask") {
                                    dispatch(saveSuccess("UpdateTask", " Task Updated successfully"))
                                }
                                else if (message == "deleteTask") {
                                    dispatch(saveSuccess("deleteTask", " Task Deleted successfully"))
                                }
                            }} />
                        )
                    }}
                />
            }
        </SafeAreaView>
    );
}

export default UnCompleted;

const styles = StyleSheet.create({
    card: {
        overflow: "hidden",
        height: calcHeight(290),
        width: calcWidth(325),
        backgroundColor: "#fff",
        marginVertical: calcHeight(10),
        borderRadius: calcHeight(8),
        elevation: 4,
        paddingBottom: calcHeight(90)
    },
    imageView: {
        height: calcHeight(130),
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontFamily: AppStyles.Fonts.Bold,
        fontSize: calcWidth(14),
        color: AppStyles.Color.TEXT_GRAY,
        marginBottom: calcHeight(6),

    },
    overview: {
        fontFamily: AppStyles.Fonts.Regular,
        fontSize: calcWidth(14),
        color: AppStyles.Color.TEXT_GRAY,
        maxWidth: "95%",
        marginBottom: calcHeight(6),

    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },

})