import { saveAnswerToQuestion } from '../utils/api';
import { saveAnswerForQuestion } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER_FOR_USER = 'SAVE_ANSWER_FOR_USER';
export const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';

/**
* @description action to change the state of users in store
* @param {object} users
*/

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

/**
* @description action to save a answer in questions and users state
* @param {string} authedUser
* @param {string} qid  
* @param {string} answer 
*/
export function handleSaveAnswerForUserAndQuestion(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(saveAnswerForUser(authedUser, qid, answer));
        dispatch(saveAnswerForQuestion(authedUser, qid, answer));

        return saveAnswerToQuestion(authedUser, qid, answer).catch(e => {
            alert('Your response to question couldnt be recorded. Please try again!')
            console.warn('Error in saving answer to a question:', e);
        });
    };
}

/**
* @description action to save answer in users state
* @param {string} authedUser
* @param {string} qid  
* @param {string} answer 
*/

function saveAnswerForUser(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER_FOR_USER,
        authedUser,
        qid,
        answer
    };
}

/**
* @description action to add question in users state
* @param {string} id
* @param {string} author  
*/

export function saveQuestionToUser({ id, author }) {
    return {
        type: SAVE_QUESTION_TO_USER,
        id,
        author
    };
}



