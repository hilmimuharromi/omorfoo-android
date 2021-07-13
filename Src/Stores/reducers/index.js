
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from "./user"
import product from "./product"
import transaction from "./transaction"
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 2000
};

const reducers = combineReducers({
    user,
    product,
    transaction
});

const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;