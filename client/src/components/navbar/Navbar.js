import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import {BsCart2} from 'react-icons/bs'
import Cart from '../cart/Cart'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const [openCart,setOpenCart]=useState(false)
    const categories = useSelector(state=>state.categorySlice.categories)
    const cart = useSelector(state=>state.cartSlice.cart)
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity)
    // console.log(categories)
  return (
    <>
    <div className='Navbar'>
        <div className="container nav-container  ">
            <div className="nav-left">
                <ul className='link-group'>
                    {categories?.map(category=>(
                    <li key={category.attributes.key} className='hover-link'>
                        <Link className='link' to={`/category/${category?.attributes.key}`}>{category?.attributes.title}</Link>
                    </li >
                    ))}
                    
                </ul>
            </div>
            <div className="nav-center">
                <Link to="/"><h1 className='banner'>POSTERZ.</h1></Link>
            </div>
            <div className="nav-right">
                <div className="nav-cart" onClick={()=>setOpenCart(!openCart)}>
                    <BsCart2 className="icon"/>
                    {totalItems > 0 &&  <span className='cart-count center'>{totalItems}</span>  }
                   

                </div>
            </div>
        </div>
    </div>
    {openCart && <Cart onClose={()=>setOpenCart(false)}/>}
    </>
  )
}

export default Navbar
