import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TouchButton from './TouchButton';
import QuizResults from './QuizResults';
import { gray, green, red, darkGray, white } from '../utils/colors';
import { connect } from 'react-redux';
import ViewPager from '@react-native-community/viewpager';
import Message from './Message';

// constants for possible answers
const answer = {
	CORRECT: 'correct',
	INCORRECT: 'incorrect'
};

/**
 * Displays chosen deck questions 
 * - display options  
 * - provide feedback if answer is correct 
 * - display number of questions remaining
 */
export class Quiz extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		title: PropTypes.string,
		deck: PropTypes.object.isRequired
	};

	// show title of deck on the header of navigation
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;

		return {
			title: `${title} Quiz`,
			headerBackTitleVisible: false
		};
	};

	state = {
		correct: [], // number of correct answers
		incorrect: [], // number of incorrect answers
		flipped: [], // toggle between 'show answer' and 'show question'
		questionCount: this.props.deck.questions.length,
		showMessage: null,
		allQuestions: {
			...this.props.deck.questions
		}
	};

	/**
	 * when user presses the 'show answer' and 'show question'
	 * id - index of question 
	 */
	handleFlip = (id) => {
		const { flipped } = this.state;

		// add or remove card index from flipped array to toggle card view
		if (flipped.includes(id)) {
			this.setState({
				flipped: flipped.filter((cardId) => cardId !== id)
			});
		}
		else {
			this.setState({
				flipped: [
					...flipped,
					id
				]
			});
		}
	};

	/**
	 * when user presses an option
	 * response - index of option
	 * page - index of question 
	 */
	handleAnswer = (response, page) => {
		let correct = [];
		let incorrect = [];
		let showMessage = false;
		if (response == this.props.deck.questions[page].answer) {
			console.log('corrrect');
			// this.setState((prevState) => ({ correct: prevState.correct + 1 }));
			correct.push(page);
			showMessage = true;
		}
		else {
			// this.setState((prevState) => ({ incorrect: prevState.incorrect + 1 }));
			console.log('Incorrect');
			incorrect.push(page);
			console.log(this.props.deck.questions[page]);
			this.setState({
				allQuestions: this.state.allQuestions.push(this.props.deck.questions[page])
			});
			showMessage = false;
		}

		this.setState({ correct, incorrect, showMessage });

		// console.log('mess', correct);
		// console.log('after mess');
	};

	nextQuestion = (page) => {
		console.log('next');
		// increment the viewPager to next question/page
		this.viewPager.setPage(page + 1);
		console.log('after next');
		this.setState({ showMessage: null });
	};

	// restart quiz
	handleRestart = () => {
		this.setState({
			questionCount: this.props.deck.questions.length,
			correct: [],
			incorrect: [],
			flipped: [],
			correct: false,
			showMessage: null,
			allQuestions: []
		});

		this.props.navigation.navigate('Quiz');
	};
	render() {
		const { questions } = this.props.deck;
		const {
			questionCount,
			allQuestions,
			flipped,
			incorrect,
			correct,
			showMessage
		} = this.state;
		console.log(this.state);
		// no questions
		if (!questions || questions.length === 0) {
			return (
				<View style={styles.noQuestions}>
					<Text style={{ fontSize: 22 }}>
						Sorry, you can't take this quiz because there are no cards in the deck.
					</Text>
				</View>
			);
		}

		// all the questions in quiz are answered
		// if (questions.length === correct.length) {
		// 	return (
		// 		<QuizResults
		// 			totalQuestions={questionCount}
		// 			correctAnswers={correct}
		// 			incorrectAnswers={incorrect}
		// 			navigation={this.props.navigation}
		// 			restart={this.handleRestart}
		// 		/>
		// 	);
		// }
		// display one quiz question at a time with viewPager
		return (
			<ViewPager
				style={styles.container}
				scrollEnabled={false}
				ref={(viewPager) => {
					this.viewPager = viewPager;
				}}>
				{allQuestions.map((question, idx) => {
					console.log(question);
					allQuestions.shift(question);
					return (
						<View style={{ flex: 1 }}>
							<View style={styles.pageStyle} key={idx}>
								<View>
									<Text style={styles.count}>
										{idx + 1} / {allQuestions.length}
									</Text>
								</View>
								<View style={styles.questionContainer}>
									<View style={styles.questionWrapper}>
										<Text style={styles.title}>{question.question}</Text>
									</View>
								</View>
								<View>
									{question.options.map((opt, index) => (
										<TouchButton
											key={index}
											onPress={(e) => {
												this.handleAnswer(index, idx);
											}}>
											{opt}
										</TouchButton>
									))}
								</View>
							</View>
							{showMessage != null && (
								<Message
									answer={question.options[question.answer]}
									correct={this.state.correct.indexOf(idx) !== -1}
									showNext={this.state.incorrect.length != 0}
									handleNext={() => this.nextQuestion(idx)}
								/>
							)}
						</View>
					);
				})}
			</ViewPager>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	pageStyle: {
		flex: 1,
		justifyContent: 'space-around',
		paddingLeft: 20,
		paddingRight: 20
	},
	count: {
		fontSize: 24
	},
	title: {
		fontSize: 32,
		textAlign: 'center'
	},
	questionContainer: {
		backgroundColor: white
	},
	questionWrapper: {
		flex: 1
	},
	noQuestions: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 30,
		marginLeft: 30
	}
});

/**
 * get the deck to display its questions from the title passed in 
 */
const mapStateToProps = ({ decks }, { navigation }) => {
	const { title } = navigation.state.params;
	const deck = decks[title];
	return {
		deck
	};
};

export default connect(mapStateToProps)(Quiz);
