import {
    _getUsers,
    _getQuestions,
    _saveQuestionAnswer,
    _saveQuestion
} from './_DATA'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveAnswerToQuestion(authedUser, qid, answer) {
    return _saveQuestionAnswer({ authedUser, qid, answer });
}

export function addQuestion(question) {
    return _saveQuestion(question);
}