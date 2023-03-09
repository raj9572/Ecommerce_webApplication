import React, { useEffect, useState } from 'react'
import Hero from '../../components/hero/Hero'
import Category from '../../components/category/Category'
import './Home.scss'
import Product from '../../components/product/Product'
import { axiosClient } from '../../Utils/axiosClient'
import { useSelector } from 'react-redux'
const Home = () => {
    const categories = useSelector(state=>state.categorySlice.categories)
    const [products, setProducts] = useState(null)

    const fetchData =async ()=>{
       const product = await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image')
       console.log(product)
       setProducts(product.data.data)
    }

    useEffect(()=>{
      fetchData()
    },[])



  return (
    <div className='Home'>
       <Hero/>
       <section className="collection container">
          <div className="info">
            <h2 className='heading'>Shop By Categories</h2>
            <p className='sub_heading'>Shop from the best, our film and TV Posters Collection</p>
          </div>
          <div className="content">
              {categories?.map(category=><Category key={category?.attributes.key} category = {category}/>)}
          </div>
       </section>

       <section className="collection container">
          <div className="info">
            <h2 className='heading'>Our Top Picks</h2>
            <p className='sub_heading'>Shop from the best, our film and TV Posters Collection</p>
          </div>
          <div className="content">
           {products?.map(product=><Product key={product?.attributes.key} product={product}/>)}
            
          </div>
       </section>
    </div>
  )
}

export default Home
