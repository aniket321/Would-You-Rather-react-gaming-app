export const SET_AUTHED_USER = 'SET_AUTHED_USER'

/**
* @description action to set Authenticated user to the store
* @param {string} id
*/

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}
