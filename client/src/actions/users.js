import axios from 'axios';
import { setAlert } from './alert';

import {
    APPROVE_USER,
    APPROVE_FAILED,
    ADMIN_USER,
    ADMIN_FAILED,
} from './types';

// Set Approved
export const setApproved = (user_id) => async dispatch => {
    try {

        const res = await axios.get(`/api/users/approve/${user_id}`);
        dispatch({
            type: APPROVE_USER,
            payload: res.data
        });
        dispatch(setAlert('User Approved Success', 'success'));

    } catch(err) {

        dispatch({
            type: APPROVE_FAILED,
            payload: { msg: 'user not approved', status: 'something went wrong' }
        });
    }
};

// Set Admin
export const setAdmin = (user_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/users/admin/${user_id}`);
        dispatch({
            type: ADMIN_USER,
            payload: res.data
        });
        dispatch(setAlert('Admin Approved Success', 'success'));

    } catch(err) {

        dispatch({
            type: ADMIN_FAILED,
            payload: { msg: 'user not approved', status: 'something went wrong' }
        });
    }
};
