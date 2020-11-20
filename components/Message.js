import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { lightGreen, red, lightRed, green } from './../utils/colors';
import CorrectMessage from './CorrectMessage';
import IncorrectMessage from './IncorrectMessage';

/* Display popup with 'Next' Question  
*/
const Message = ({ correct, answer, showNext, handleNext }) => {
	return (
		<View style={correct ? styles.correct : styles.incorrect}>
			<View style={styles.messageContainer}>
				{correct ? (
					<CorrectMessage
						text="Well Done"
						color={green}
						showNext={showNext}
						handleNext={handleNext}
					/>
				) : (
					<IncorrectMessage answer={answer} color={red} handleNext={handleNext} />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		height: '30%',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	correct: {
		backgroundColor: lightGreen
	},
	incorrect: {
		backgroundColor: lightRed
	}
});

export default Message;
