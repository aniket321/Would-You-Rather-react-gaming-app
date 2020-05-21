import { saveAnswerToQuestion } from '../utils/api';
import { saveAnswerForQuestion } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER_FOR_USER = 'SAVE_ANSWER_FOR_USER';
export const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

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

function saveAnswerForUser(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER_FOR_USER,
        authedUser,
        qid,
        answer
    };
}

export function saveQuestionToUser({ id, author }) {
    return {
        type: SAVE_QUESTION_TO_USER,
        id,
        author
    };
}



