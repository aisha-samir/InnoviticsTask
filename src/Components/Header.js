import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { calcHeight, calcWidth } from '../Config/Dimension'
import AppStyles from '../Config/styles'
import Icon from 'react-native-vector-icons/Entypo';



const Header = ({ navigation, Title, back }) => {

    return (

        <View style={{
            backgroundColor: 'white', elevation: 5, height: calcHeight(75), paddingHorizontal: calcWidth(10), width: "100%",
            flexDirection: "row", justifyContent: back ? "space-between" : "center", alignItems: "center",
        }}>
            {back && <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Icon name={'chevron-left'} size={40} color={AppStyles.Color.DARK_THEM}

                />

            </TouchableOpacity>}


            <Text style={{ fontFamily: AppStyles.Fonts.Bold, color: AppStyles.Color.DARK_THEM, fontSize: calcWidth(22), }}>{Title}</Text>
            <Icon name='arrow-back' size={40} color="white" />

        </View>
    );
}

export default Header;

const styles = StyleSheet.create({

})