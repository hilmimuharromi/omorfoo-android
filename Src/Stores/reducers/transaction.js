const initialState = {
    data: "",
    loading: false
}

export default function TransactionReducer(state = initialState, action) {

    if (action.type === 'SET_TRANSACTIONS') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SET_LOADING_TRANSACTIONS') {
        return {
            ...state,
            loading: action.payload
        };
    }
    return state
}