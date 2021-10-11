import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import TopTabNavigation from '../Navigation/TopTabNavigation'
import moment from 'moment'
import Circle from '../Assets/Svgs/Circle'
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';





const Home = ({ navigation }) => {
    const generalState = useSelector(state => state.generalReducer)
    const [numberOfUnComleted, setnumberOfUnComleted] = useState(0)


    useEffect(() => {
        if (generalState.data.UnComleted) {

            setnumberOfUnComleted(generalState.data.UnComleted.length)
        }
    }, [generalState.data.UnComleted])

    return (
        <SafeAreaView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", }}>
            <Text style={styles.date}>{moment(new Date()).format('DD.MM.YYYY')}</Text>
            {/* <View style={{ position: "absolute", top: calcHeight(28), right: calcWidth(10), }}>
                <Circle />
            </View> */}
            <View style={{
                flexDirection: "row", paddingHorizontal: calcWidth(22),
                alignItems: "center", justifyContent: "space-between"
            }}>

                <Text style={styles.today}>Today Tasks</Text>
                <View style={styles.Circle}>
                    <Text style={styles.number}>{numberOfUnComleted}</Text>
                </View>
            </View>
            <TopTabNavigation navigation={navigation} />



        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    Circle: {
        height: calcHeight(56),
        width: calcHeight(56),
        borderRadius: calcHeight(28),
        backgroundColor: "#58d4f1",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4

    },
    date: {
        fontSize: calcWidth(18),
        fontFamily: AppStyles.Fonts.Regular,
        color: AppStyles.Color.TEXT_GRAY,
        marginTop: calcHeight(42),
        marginLeft: calcWidth(22)
    },
    today: {
        fontSize: calcWidth(26),
        fontFamily: AppStyles.Fonts.Regular,
        color: AppStyles.Color.TEXT_BLUE,
        //  marginLeft: calcWidth(22)
    },
    number: {
        fontSize: calcWidth(18),
        fontFamily: AppStyles.Fonts.Bold,
        color: AppStyles.Color.TEXT_BLUE,
    }

})