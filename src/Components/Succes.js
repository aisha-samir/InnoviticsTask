import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { calcHeight, calcWidth } from '../Config/Dimension'
import AppStyles from '../Config/styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { clearSuccessMessages } from '../Integration/api/ApisFunctions'
import { useSelector, useDispatch } from 'react-redux';
import Icon3 from 'react-native-vector-icons/Ionicons';

export const Succes = (props) => {
    const [doneModal, setdoneModal] = useState(true)
    const dispatch = useDispatch();
    const clear = () => dispatch(clearSuccessMessages());

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
        // onBackdropPress={() => clear()}
        >

            <View style={styles.ModalView}>

                <Text style={[styles.ModalText, { textAlign: "center" }]}>
                    {props.message}
                </Text>

                <Icon3 name={"ios-checkmark-circle-outline"} color="#0CAF32" size={calcHeight(30)} />

                <TouchableOpacity
                    onPress={() => clear()}
                    style={styles.Modaltouchable}>
                    <Text style={styles.ModaltouchableText}>
                        Done
                    </Text>
                </TouchableOpacity>

            </View>

        </Modal>

    )
}

const styles = StyleSheet.create({
    modalTitle: {
        color: AppStyles.Color.WHITE,
        fontSize: calcWidth(26),
        fontFamily: AppStyles.Fonts.Regular,
        marginLeft: calcWidth(22),
    },
    ModalView: {
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
    Modaltouchable: {
        width: calcWidth(120),
        height: calcHeight(40),
        marginTop: calcHeight(17),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: calcHeight(12),
        backgroundColor: "#EE5E1E"
    },
    ModaltouchableText: {
        fontFamily: AppStyles.Fonts.Regular,
        fontSize: calcWidth(14),
        color: "#fff",
    },
    ModalText: {
        fontFamily: AppStyles.Fonts.Bold,
        fontSize: calcWidth(14),
        color: "#0CAF32",
        marginBottom: calcHeight(8),
        width: calcWidth(220)
    },
})

