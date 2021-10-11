import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { calcHeight, calcWidth } from '../Config/Dimension'
import AppStyles from '../Config/styles'
import Close from '../Assets/Svgs/Close'

export const Card = (props) => {

    return (
        <TouchableOpacity style={styles.card}>
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
            <TouchableOpacity style={styles.close}>
                <Close />
            </TouchableOpacity>
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

