import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, RefreshControl, FlatList, ActivityIndicator } from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const UnCompleted = ({ navigation }) => {
    const dispatch = useDispatch();
    const generalState = useSelector(state => state.generalReducer)
    const presistState = useSelector(state => state.presistReducer)
    const [data, setdata] = useState(null)

    // useEffect(() => {
    //     if (presistState.data.MyMovies) {
    //         setdata(presistState.data.MyMovies)
    //     }
    // }, [presistState])

    return (
        <SafeAreaView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", alignItems: "center" }}>

            {data != null &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ width: "100%", }}
                    contentContainerStyle={{ paddingBottom: calcHeight(50), paddingTop: calcHeight(20), alignItems: "center" }}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.card}>

                                <View style={styles.imageView}>
                                    {item.image != null ?
                                        <Image
                                            source={{ uri: `data:image/gif;base64,${item.image}` }}
                                            style={{ height: "100%", width: "100%" }}
                                            resizeMode="cover"
                                        />
                                        : <Icon name="image-off-outline" color={AppStyles.Color.GRAY} size={100} />}

                                </View>

                                <View style={{ marginTop: calcHeight(10), padding: calcHeight(8) }}>
                                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
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