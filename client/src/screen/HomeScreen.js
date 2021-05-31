import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productAction } from '../redux/action/productAction'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
export default function HomeScreen() {
    const dispatch = useDispatch()
    const { product } = useSelector(state => state.productReducer)
    console.log(product)
    useEffect(() => {
        dispatch(productAction())
    }, [dispatch])
    const MakePayment = (token, name, price) => {
        const product = { name: name, price: price }
        axios.post('/payment', token, product)
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }
    return (
        <div className="container">
            {
                product.map(Product => (
                    <div className="card">
                        <img src={`http://localhost:5000/static/images/${Product.image}`} alt="" width="220" />
                        <div className="card-body">
                            <h4>{Product.name}</h4>
                            <p>${Product.price}</p>
                            <StripeCheckout stripeKey={process.env.REACT_APP_KEY} amount={Product.price * 100} token={MakePayment(Product.name, Product.price)} name="Jewllery payment">
                                <button>Buy Now</button>
                            </StripeCheckout>

                        </div>
                    </div>
                ))
            }

        </div>
    )
}
