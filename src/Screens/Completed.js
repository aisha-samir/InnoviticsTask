import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, RefreshControl, FlatList, ActivityIndicator } from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import TopTabNavigation from '../Navigation/TopTabNavigation'
import { useSelector, useDispatch } from 'react-redux';
import { GetAllMovies } from '../Integration/api/ApisFunctions';
import { Loader } from '../Components/Loader';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Error } from '../Components/Erorr';




const Completed = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const generalState = useSelector(state => state.generalReducer)
    const presistState = useSelector(state => state.presistReducer)
    const [page, setPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false);
    const [data, setdata] = useState(null)
    // useEffect(() => {
    //     dispatch(GetAllMovies(data, page))
    // }, [])

    // useEffect(() => {
    //     dispatch(GetAllMovies(data, page))
    // }, [page])

    // useEffect(() => {
    //     if (generalState.data.GetAllMovies) {
    //         setdata(generalState.data.GetAllMovies)
    //     }
    // }, [generalState])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1)
        setdata(null)
        dispatch(GetAllMovies(data, page))
        setTimeout(() => setRefreshing(false), 1000)
    }, [refreshing]);


    return (
        <SafeAreaView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", alignItems: "center" }}>
            {generalState.Loading.GetAllMovies && <Loader />}
            {generalState.Errors.GetAllMovies && <Error error={generalState.Errors.GetAllMovies} />}

            {data != null &&
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[AppStyles.Color.DARK_THEM]}
                            progressViewOffset={calcHeight(100)}
                        />
                    }
                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                        let newpage = page + 1
                        setPage(newpage)
                    }
                    }
                    ListFooterComponent={() => {
                        return (
                            <ActivityIndicator size={"large"} color={AppStyles.Color.DARK_THEM} />
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%", }}
                    contentContainerStyle={{ paddingBottom: calcHeight(50), paddingTop: calcHeight(20), alignItems: "center" }}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.card}>
                                <View style={styles.imageView}>
                                    {item.poster_path ?
                                        <Image
                                            source={{
                                                uri: "https://image.tmdb.org/t/p/" + item.poster_path,
                                            }}
                                            style={{ height: "100%", width: "100%" }}
                                            resizeMode="cover"
                                        />
                                        : <Icon name="image-off-outline" color={AppStyles.Color.GRAY} size={100} />}

                                </View>

                                <View style={{ marginTop: calcHeight(10), padding: calcHeight(8) }}>
                                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.overview} numberOfLines={4} >{item.release_date}</Text>
                                    <Text style={styles.overview} numberOfLines={4} >{item.overview}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            }



        </SafeAreaView>
    );
}

export default Completed;

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
        backgroundColor: AppStyles.Color.LIGHT_GRAY,
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