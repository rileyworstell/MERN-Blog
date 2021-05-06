import axios from 'axios';
import { setAlert } from './alert';

import {
    APPROVE_USER,
    APPROVE_FAILED
} from './types';

// Create or Update Profile
export const setApproved = (user_id) => async dispatch => {
    try {

        const res = await axios.get(`/api/users/approve/${user_id}`);
        dispatch({
            type: APPROVE_USER,
            payload: res.data
        });
        dispatch(setAlert('User Approved Success'));

    } catch(err) {

        dispatch({
            type: APPROVE_FAILED,
            payload: { msg: 'user not approved', status: 'something went wrong' }
        });
    }
};