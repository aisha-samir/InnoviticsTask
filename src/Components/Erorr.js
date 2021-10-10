import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { calcHeight, calcWidth } from '../Config/Dimension'
import AppStyles from '../Config/styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { clearErrors } from '../Integration/api/ApisFunctions'
import { useSelector, useDispatch } from 'react-redux';

export const Error = (props) => {
    const [modal, setModal] = useState(true)
    const dispatch = useDispatch();
    const clear = () => dispatch(clearErrors());

    return (
        <Modal
            testID={'modal'}
            isVisible={true}
            backdropColor="rgba(0,0,0,0.3)"
            backdropOpacity={0.8}
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            statusBarTranslucent={true}
            onBackdropPress={() => clear()}
        >

            <View style={styles.View}>

                <Text style={[styles.Text, { textAlign: "center" }]}>
                    {props.error}
                </Text>

                <Icon name={"error-outline"} color="#EE5E1E" size={calcHeight(30)} />

                <TouchableOpacity
                    onPress={() => clear()}
                    style={styles.touchable}>
                    <Text style={styles.touchableText}>
                        Done
                    </Text>
                </TouchableOpacity>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    Text: {
        fontFamily: AppStyles.Fonts.Bold,
        fontSize: calcWidth(14),
        color: "#EE5E1E",
        marginBottom: calcHeight(8),
        width: calcWidth(220)
    },
    View: {
        padding: calcHeight(20),
        backgroundColor: "#fff",
        borderRadius: calcHeight(12),
        shadowColor: "#00000061",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 6,
        alignSelf: "center",
        width: calcWidth(300),
        alignItems: "center"
    },
    touchable: {
        width: calcWidth(120),
        height: calcHeight(40),
        marginTop: calcHeight(17),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: calcHeight(12),
        backgroundColor: "#EE5E1E"
    },
    touchableText: {
        fontFamily: AppStyles.Fonts.Regular,
        fontSize: calcWidth(14),
        color: "#fff",
    },
})

