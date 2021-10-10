import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import AppStyles from '../Config/styles'
import Modal from 'react-native-modal';


let { Color } = AppStyles


export const Loader = (props) => {
	return (
		<Modal
			testID={'modal'}
			isVisible={true}
			backdropColor="rgba(0,0,0,0.15)"
			backdropOpacity={0.8}
			//animationInTiming={600}
			//animationOutTiming={600}
			//backdropTransitionInTiming={600}
			//backdropTransitionOutTiming={600}
			statusBarTranslucent={true}
		>
			<View
				style={{
					width: '100%',
					height: '100%',
					//backgroundColor: props.closeOpacity ? 'transparent' : 'rgba(0,0,0,.4)',
					//backgroundColor: "red",
					//position: 'absolute',
					//zIndex: 100001,
					justifyContent: 'center',
					alignItems: 'center',

				}}
			>
				<ActivityIndicator
					color={props.color ? props.color : Color.DARK_THEM}
					size={props.small ? 'small' : 'large'}
				/>
			</View>
		</Modal>
	)
}


// export const Loader = (props) => {
// 	return (
// 		<View
// 			style={{
// 				width: '100%',
// 				height: '100%',
// 				backgroundColor: props.closeOpacity ? 'transparent' : 'rgba(0,0,0,.4)',
// 				//backgroundColor: "red",
// 				position: 'absolute',
// 				zIndex: 100001,
// 				justifyContent: 'center',
// 				alignItems: 'center',

// 			}}
// 		>
// 			<ActivityIndicator
// 				color={props.color ? props.color : Color.DARK_THEM}
// 				size={props.small ? 'small' : 'large'}
// 			/>
// 		</View>
// 	)
// }
