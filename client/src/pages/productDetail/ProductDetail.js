import React, { useEffect, useState } from 'react'
import './ProductDetail.scss'
import dummyImg from '../../assests/naruto.jpeg'
import { useParams } from 'react-router-dom'
import { axiosClient } from '../../Utils/axiosClient'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/cartSlice'
const ProductDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [product,setProduct] = useState(null)
  const cart = useSelector(state=>state.cartSlice.cart)
  const quantity = cart.find(item => item.key === params.productId)?.quantity || 0


  async function fetchData(){
    const productResponse = await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=image`)
    if(productResponse.data.data.length > 0){setProduct(productResponse.data.data[0])}
    
  }

  
  useEffect(()=>{
    setProduct(null)
    fetchData()
  },[])

  if(!product){
     return <Loader/>
  }
  return (
    <div className='ProductDetail'>
       <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <div className="img-container">
            <img src={product?.attributes?.image?.data?.attributes?.url} alt="product" />
            </div>
          </div>

          <div className="product-info">
              <h1>{product?.attributes?.title}</h1>
              <h3 className='price'> ₹ {product?.attributes?.price}</h3>
              <p className='description'> {product?.attributes?.description}</p>
        
          <div className="cart-option">
            <div className="quantity-selector">
              <span className='btn decrement ' onClick={()=>dispatch(removeFromCart(product))}>-</span>
              <span className='quantity '>{quantity}</span>
              <span className='btn increment ' onClick={()=>dispatch(addToCart(product))}>+</span>
            </div>
            <button className="btn-primary add-to-cart" onClick={()=>dispatch(addToCart)}>Add to cart</button>
          </div>
            <div className="return-policy">
              <ul>
                <li>our item must be unused and in the same condition that you received it. </li>
                <li>our item must be unused and in the same condition that you received it. </li>
              </ul>
            </div>
          </div>


        </div>
       </div>
    </div>
  )
}

export default ProductDetail
