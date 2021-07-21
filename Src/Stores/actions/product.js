import { API_URL } from "@env"
import axios from "axios"

const GetProducts = (user) => {
    return async (dispatch) => {
        console.log(API_URL, 'get product')
        dispatch(SetLoading(true))
        const { token } = user
        try {
            const { data } = await axios.get(`${API_URL}/product`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data) {
                console.log(data, 'dari get products')
                dispatch(SetProducts(data.data))
            }
        } catch (e) {
            console.log(JSON.stringify(e), 'masuk error get product')
            dispatch(SetProducts([]))
        } finally {
            dispatch(SetLoading(false))
        }
    }
}

const GetProductsFilter = (query) => {
    return {
        type: 'SET_PRODUCTS_FILTER', payload: query
    };
}

const SetProducts = (data) => {
    return {
        type: 'SET_PRODUCTS', payload: data
    };
}

const SetEditProduct = (data) => {
    console.log('masuk edit product')
    return {
        type: 'SET_EDIT_PRODUCT', payload: data
    };
}
const SetLoading = (data) => {
    return { type: 'SET_LOADING_PRODUCTS', payload: data };
}


export {
    GetProducts,
    SetLoading,
    GetProductsFilter,
    SetEditProduct
}