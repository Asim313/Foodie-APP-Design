import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableWithoutFeedback, Text } from 'react-native';

export default class Toast extends React.Component {

	static show(msg,inverted) {

		_toast.setState({
			display: true,
			message: msg,
			inverted:typeof inverted == 'undefined'?false:true
		}, () => {

			Animated.parallel([
				Animated.timing(_toast.animateToast.opacity, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true
				}),
				Animated.timing(_toast.animateToast.translateY, {
					toValue: 0,
					duration: 200,
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
				duration: 200,
				useNativeDriver: true
			}),
			Animated.timing(_toast.animateToast.translateY, {
				toValue: 15,
				duration: 200,
				useNativeDriver: true
			})
		]).start(() => {

			this.setState({
				display: false
			})

		});

	}

	render() {
		// console.log("inverted " + this.state.inverted)
		if (this.state.display) {

			return (
				<TouchableWithoutFeedback onPress={() => this.close()}>
					<View style={styles.container}>
						<Animated.View
							style={[this.state.inverted?styles.invertedToast:styles.toast, {
								opacity: this.animateToast.opacity,
								transform: [{
									translateY: this.animateToast.translateY
								}]
							}]}>
							<Text style={this.state.inverted?styles.invertedText:styles.text}>{this.state.message}</Text>
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
		width: Dimensions.get('window').width,
		padding: 16,
		position: 'absolute',
		bottom: 40
	},
	toast: {
		backgroundColor: 'rgba(0,0,0,0.9)',
		borderRadius: 32,
		padding: 15
	},
	text: {
		color: '#ffffff',
		fontSize: 14,
		textAlign: 'center'
	},
	invertedToast: {
		backgroundColor: 'rgba(255,255,255,0.95)',
		borderRadius: 32,
		padding: 15
	},
	invertedText: {
		color: '#000000',
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'NorthernIreland-Bold'
	}
});
