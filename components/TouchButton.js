import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { lightPurple, white, gray } from '../utils/colors';

/**
 * Component to display the standard button used in other components 
 */
const TouchButton = ({ children, btnStyle = {}, txtStyle = {}, onPress }) => {
	return (
		<View style={styles.btnContainer}>
			<TouchableOpacity
				style={[
					styles.btn,
					btnStyle
				]}
				onPress={onPress}>
				<Text
					style={[
						styles.btnText,
						txtStyle
					]}>
					{children}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	btnContainer: {
		marginTop: 30,
		paddingLeft: 10,
		paddingRight: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 5,
		width: '100%',
		height: 50,
		backgroundColor: lightPurple,
		borderWidth: 1,
		borderColor: gray
	},

	btnText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: white
	}
});

export default TouchButton;
