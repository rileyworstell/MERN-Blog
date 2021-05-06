import {
    APPROVE_USER, APPROVE_FAILED
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type } = action;

    switch(type) {
        case APPROVE_USER:
        case APPROVE_FAILED:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};

