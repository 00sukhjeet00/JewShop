import axios from "axios"
import { FETCH_PRODUCT } from "./types"

export const productAction = () => async (dispatch) => {
    const { data } = await axios.get('/api/product/')
    dispatch({ type: FETCH_PRODUCT, payload: data })
}