import { FETCH_PRODUCT } from "../action/types";

export const productReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            return { product: action.payload }
        default:
            return state;
    }
}