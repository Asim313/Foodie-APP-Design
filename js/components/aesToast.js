import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableWithoutFeedback, Text, Image } from 'react-native';
import * as Colours from "../styles/colours";
import UserStore from "../stores/SiteStore";

export default class AESToast extends React.Component {

	static show(msg,icon) {

		_toast.setState({
			display: true,
			message: msg,
			icon: icon
		}, () => {

			Animated.parallel([
				Animated.timing(_toast.animateToast.opacity, {
					toValue: 1,
					duration: 750,
					useNativeDriver: true
				}),
				Animated.timing(_toast.animateToast.translateY, {
					toValue: 0,
					duration: 750,
					useNativeDriver: true
				})
			]).start(() => {

				// Auto close after 2 seconds
				setTimeout(() => {
					_toast.close();
				}, 2000)

			});

		})

	}

	constructor(props, context) {

		super(props, context);

		this.state = {
			display: false,
			message: '',
			animateToast: 1
		}

		this.animateToast = {
			opacity: new Animated.Value(0),
			translateY: new Animated.Value(15)
		}

		_toast = this;

	}

	close() {

		Animated.parallel([
			Animated.timing(_toast.animateToast.opacity, {
				toValue: 0,
				duration: 750,
				useNativeDriver: true
			}),
			Animated.timing(_toast.animateToast.translateY, {
				toValue: 15,
				duration: 750,
				useNativeDriver: true
			})
		]).start(() => {

			this.setState({
				display: false
			})

		});

	}

	getIcon(){
		switch(this.state.icon){
			case 'passcode': return require('../../assets/images/notifications/passcode.png');
			default: return require('../../assets/images/notifications/passcode.png');
		}
	}

	render() {
		let { currentMode } = UserStore
		if (this.state.display) {
			return (
				<TouchableWithoutFeedback onPress={() => this.close()}>
					<View style={styles.container}>
						<Animated.View
							style={[styles.toast,{borderColor:Colours[currentMode].primaryColour}, {
								opacity: this.animateToast.opacity,
								transform: [{
									translateY: this.animateToast.translateY
								}]
							}]}>
							{/*<Image style={styles.toastIcon} source={this.getIcon()}/>*/}
							<Text style={styles.text}>{this.state.message}</Text>
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>
			)
		}
		else {

			return (
				<View />
			)
		}

	}

}

const styles = StyleSheet.create({
	container: {
		width: (Dimensions.get('window').width*0.9),
		padding: 16,
		position: 'absolute',
		bottom: 50,
		alignSelf:'center',
	},
	toast: {
		backgroundColor: Colours.white,
		borderWidth:1,
		padding: 15,
		borderRadius:5,
		flexDirection:'row',
		alignContent:'center',
		justifyContent:'center',
	},
	text: {
		color: Colours.darkGray,
		fontSize: 15,
		textAlign: 'center',
		fontFamily:'Roboto-Regular',
		alignSelf:'center'
	},
	toastIcon:{
		alignSelf:'center'
	}
});
