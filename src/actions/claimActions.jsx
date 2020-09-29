import * as types from '../constants/actionTypes';

export const setUserName = username => ({
    type: types.SET_LOGGED_USER,
    payload: { loggedUser: username }
})


export const receiveClaimList = claimlist => ({
    type: types.RECEIVE_CLAIMS,
    payload: { claimlist }
})
