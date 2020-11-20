import React from 'react';
import TouchButton from './TouchButton';
import { View, Text } from 'react-native';

const IncorrectMessage = ({ answer, handleNext, color }) => {
	const txtStyle = {
		color,
		paddingBottom: 10,
		fontWeight: 'bold',
		fontSize: 22
	};

	const correctAns = {
		paddingBottom: 0,
		fontWeight: 'normal',
		fontSize: 18
	};
	return (
		<View>
			<Text style={txtStyle}>Correct Answer:</Text>
			<Text
				style={[
					txtStyle,
					correctAns
				]}>
				{answer}
			</Text>

			<TouchButton
				btnStyle={{ backgroundColor: { color }, borderColor: color }}
				onPress={handleNext}>
				<Text txtStyle={{ color: { color } }}>Next</Text>
			</TouchButton>
		</View>
	);
};

export default IncorrectMessage;
