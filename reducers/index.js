import {
    SET_USER,
    SET_USERS,
    SET_ACTIVITY,
    SET_ACTIVITIES,
    SET_START,
    SET_END,
    ADD_LOG,
} from '../constants/actions';

const initialState = {
    user: '',
    activity: '',
    startTime: '',
    endTime: '',
    isRecording: false,

    users: [],
    activities: [],
    logs: {},
};

const rootReducer = (state = initialState, action) => {
    console.log(state)

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
                isRecording: true,
                logs: {}
            }
        case SET_END:
            return {
                ...state,
                endTime: action.data,
                isRecording: false
            }
        case ADD_LOG:
            var logs = state.logs[action.key]

            console.log(logs)

            return {
                ...state,
                logs: {
                    ...state.logs,
                    [action.key]: [...state.logs[action.key], action.data]
                }
            }
        default:
            return state
    }
}

export default reducer = (state = initialState, action) => {
    return rootReducer(state, action)
}