const initialState = {
    data: [],
    dataFilter: "",
    dataEdit: "",
    loading: false
}

export default function ProductReducer(state = initialState, action) {

    if (action.type === 'SET_PRODUCTS') {
        return {
            ...state,
            data: action.payload
        };
    } else if (action.type === 'SET_PRODUCTS_FILTER') {
        let query = action.payload
        if (!query) {
            return {
                ...state, dataFilter: ""
            }
        }

        checkName = (name, str) => {
            var pattern = str.split("").map((x) => {
                return `(?=.*${x})`
            }).join("");
            var regex = new RegExp(`${pattern}`, "g")
            return name.match(regex);
        }
        query = query.toLowerCase()
        console.log(query, 'query', state.dataFilter)
        return {
            ...state,
            dataFilter: state.data.filter(item => {
                // query = query.toLowerCase()
                return item.name.toLowerCase().includes(query) || item.productCode.toLowerCase().includes(query)
            })
        };
    } else if (action.type === 'SET_EDIT_PRODUCT') {
        return {
            ...state,
            dataEdit: action.payload
        };
    } else if (action.type === 'SET_LOADING_PRODUCTS') {
        return {
            ...state,
            loading: action.payload
        };
    }
    return state
}