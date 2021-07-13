import { API_URL } from "@env"
import axios from "axios"

const GetTransactions = (payload, user) => {
    return async (dispatch) => {
        dispatch(SetLoading(true))
        const { startDate, endDate } = payload
        console.log(payload, 'payload get transaksi')
        const { token } = user
        try {
            const { data } = await axios.get(`${API_URL}/transaction?startDate=${startDate}&endDate=${endDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data, 'dari get Transaction')
            if (data) {
                dispatch(SetTransactions(data.data))
            }
        } catch (e) {
            console.log(e, 'masuk error get TRANSACTION')
            dispatch(SetTransactions([]))
        } finally {
            dispatch(SetLoading(false))
        }
    }
}

const SetTransactions = (data) => {
    return {
        type: 'SET_TRANSACTIONS', payload: data
    };
}

const SetLoading = (data) => {
    return { type: 'SET_LOADING_TRANSACTIONS', payload: data };
}

export {
    GetTransactions
}
