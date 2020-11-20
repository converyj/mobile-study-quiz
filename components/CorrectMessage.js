import React from 'react';
import TouchButton from './TouchButton';
import { View, Text } from 'react-native';

const CorrectMessage = ({ text, showNext, handleNext, color }) => {
	const txtStyle = {
		color,
		paddingBottom: 20,
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: 'center'
	};
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text style={txtStyle}>{text}</Text>
			{showNext && (
				<TouchButton btnStyle={{ backgroundColor: { color } }} onPress={handleNext}>
					<Text txtStyle={{ color: { color } }}>Next</Text>
				</TouchButton>
			)}
		</View>
	);
};

export default CorrectMessage;
