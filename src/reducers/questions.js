import {
    RECEIVE_QUESTIONS,
    SAVE_ANSWER_FOR_QUESTION,
    ADD_NEW_QUESTION
} from '../actions/questions'

/**
* @description reducer for questions
*/

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_NEW_QUESTION:
            const { question } = action;

            return {
                ...state,
                [question.id]: question
            };
        case SAVE_ANSWER_FOR_QUESTION:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            };
        default:
            return state
    }
}


