import React from 'react'
import './Cart.scss'
import {AiOutlineClose} from 'react-icons/ai'
import CartItem from '../CartItems/CartItem'
import { useSelector } from 'react-redux'
import { BsCartX } from 'react-icons/bs'
import { axiosClient } from '../../Utils/axiosClient'
import {loadStripe} from '@stripe/stripe-js';

// const stripePromise =

const Cart = ({ onClose }) => {
  const cart = useSelector(state=>state.cartSlice.cart)
  let totalAmount = 0
  cart.forEach(item => totalAmount += (item.price*item.quantity))
  const isEmpty = cart.length === 0;


  async function handleCheckout(){
    const response = await axiosClient.post('orders',{
      products:cart
    })
    const stripe =  await  loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);;
    await stripe.redirectToCheckout({
      sessionId:response.data.stripeId
    })
     
  }


  return (
    <div className='Cart'>
      <div className="overlay" onClick={onClose}></div>

        <div className="cart-content" >
          <div className="header">
            <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}> <AiOutlineClose/> Close</div>

          </div>

          <div className="cart-items">
          {cart?.map(item => <CartItem key={item.key} cart={item}/>)}
          {/* <CartItem/>
          <CartItem/> */}
          {/* <CartItem/> */}
          </div>

         { isEmpty && <div className="empty-cart-info">
             <div className="icon"><BsCartX/></div>
              <h3>Cart is Empty</h3>
             
          </div>}

          {!isEmpty && <div className="checkout-info">
            <div className="total-amount">
              <h3 className='total-message'>Total:</h3>
              <h3 className='total-value'>₹ {totalAmount}</h3>
            </div>
            
            <div className="checkout btn btn-primary" onClick={handleCheckout}>
              CheckOut now
            </div>
          </div>}
        </div>
      
    </div>
  )
}

export default Cart
