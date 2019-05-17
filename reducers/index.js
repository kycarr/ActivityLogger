import {
    SET_USER,
    SET_USERS,
    SET_ACTIVITY,
    SET_ACTIVITIES,
    SET_START,
    SET_END,
} from '../constants/actions';

const initialState = {
    user: '',
    activity: '',
    users: [],
    activities: [],

    startTime: '',
    endTime: '',
    isRecording: false,
    
    logs: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.data
            }
        case SET_USERS:
            return {
                ...state,
                users: action.data
            }
        case SET_ACTIVITY:
            return {
                ...state,
                activity: action.data
            }
        case SET_ACTIVITIES:
            return {
                ...state,
                activities: action.data
            }
        case SET_START:
            return {
                ...state,
                startTime: action.data,
                endTime: '',
                isRecording: true
            }
        case SET_END:
            return {
                ...state,
                endTime: action.data,
                isRecording: false
            }
        default:
            return state
    }
}

export default reducer = (state = initialState, action) => {
    return rootReducer(state, action)
}