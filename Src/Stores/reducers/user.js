const initialState = {
    data: "",
    loading: false
}

export default function EditorReducer(state = initialState, action) {

    if (action.type === 'SET_USER') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SET_LOADING_USER') {
        return {
            ...state,
            loading: action.payload
        };
    }
    return state
}