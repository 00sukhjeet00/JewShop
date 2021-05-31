import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from './reducer/productReducer'
const reducer = combineReducers({
    productReducer: productReducer,
})
const store = createStore(reducer, applyMiddleware(thunk))
export default store