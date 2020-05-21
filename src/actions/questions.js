import { addQuestion } from '../utils/api';
import { saveQuestionToUser } from '../actions/users';
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_FOR_QUESTION = 'SAVE_ANSWER_FOR_QUESTION';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';

/**
* @description action to change the state of questions
* @param {object} questions
*/

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

/**
* @description action to add new question
* @param {string} optionOneText
* @param {string} optionTwoText  
* @param {string} author 
*/

export function handleAddNewQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        dispatch(showLoading())
        return addQuestion({ optionOneText, optionTwoText, author }).then(
            question => {
                dispatch(addNewQuestion(question));
                dispatch(saveQuestionToUser(question));
                dispatch(hideLoading())
            }
        );
    };
}

/**
* @description action to save answer for a question
* @param {string} authedUser
* @param {string} qid  
* @param {string} answer 
*/

export function saveAnswerForQuestion(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER_FOR_QUESTION,
        authedUser,
        qid,
        answer
    };
}

/**
* @description action to add a new question
* @param {object} question
*/


function addNewQuestion(question) {
    return {
        type: ADD_NEW_QUESTION,
        question
    };
}





