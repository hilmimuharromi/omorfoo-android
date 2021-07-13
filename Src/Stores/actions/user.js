const SetUser = (data) => {
    return {
        type: 'SET_USER', payload: data
    };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_USER', payload: data };
}


export {
    SetUser,
    SetLoading
}