import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Platform } from 'react-native'
import AppStyles from '../Config/styles'
import { calcHeight, calcWidth } from '../Config/Dimension'
import TopTabNavigation from '../Navigation/TopTabNavigation'
import { FAB } from 'react-native-paper';
import moment from 'moment'






const Home = ({ navigation }) => {


    return (
        <SafeAreaView style={{ backgroundColor: '#F5F7FA', height: "100%", width: "100%", }}>
            <Text style={styles.date}>{moment(new Date()).format('DD.MM.YYYY')}</Text>
            <View style={{
                flexDirection: "row", alignItems: "center",
                justifyContent: "space-between", width: "100%", backgroundColor: "red"
            }}>
                <Text style={styles.today}>Today Tasks</Text>
            </View>
            <TopTabNavigation navigation={navigation} />
            <FAB
                style={styles.fab}
                color="white"
                icon="plus"
                onPress={() => {
                    navigation.navigate("AddMoive")
                    console.log(navigation)

                }}
            />
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    fab: {
        backgroundColor: AppStyles.Color.DARK_THEM,
        position: 'absolute',
        color: 'white',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    date: {
        fontSize: calcWidth(18),
        fontFamily: AppStyles.Fonts.Regular,
        color: AppStyles.Color.TEXT_GRAY,
        marginTop: calcHeight(42),
        marginLeft: calcWidth(52)
    },
    today: {
        fontSize: calcWidth(26),
        fontFamily: AppStyles.Fonts.Regular,
        color: AppStyles.Color.TEXT_BLUE,
        marginLeft: calcWidth(52)
    }
})