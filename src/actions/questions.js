import { addQuestion } from '../utils/api';
import { saveQuestionToUser } from '../actions/users';
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_FOR_QUESTION = 'SAVE_ANSWER_FOR_QUESTION';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

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

export function saveAnswerForQuestion(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER_FOR_QUESTION,
        authedUser,
        qid,
        answer
    };
}

function addNewQuestion(question) {
    return {
        type: ADD_NEW_QUESTION,
        question
    };
}





