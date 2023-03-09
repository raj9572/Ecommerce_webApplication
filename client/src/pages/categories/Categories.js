import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Product from '../../components/product/Product'
import { axiosClient } from '../../Utils/axiosClient'
import './Categories.scss'
const Categories = () => {
  const navigate= useNavigate()
  const params = useParams()
  const [products,setProducts]=useState([])
  const categories = useSelector(state=>state.categorySlice.categories)
  const sortOptions = [
    {
    key:'price-asc',
    value:'Price - Low To High',
    sort:'price'
  },
    {
      key:'newest-first',
      value:'Newest First',
      sort:'createdAt'
    },
  ]
  const [sortBy , setsortBy] = useState(sortOptions[0].sort)

  async function fetchProduct(){
    const url = params.categoryId ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId }&sort=${sortBy}` :`/products?populate=image&sort=${sortBy}`
    const res = await axiosClient.get(url)
      setProducts(res.data.data)
  }

  const handleSortChange = (e)=>{
    const sortKey = e.target.value
    setsortBy(sortKey)
    // const sortOption = sortOptions.find(item=>item.key ===sortKey )
  }
 
  useEffect(()=>{
     fetchProduct()
  },[params,sortBy])
 

  const updateCategory=(e)=>{
      navigate(`/category/${e.target.value}`)

  }
  return (
    <div className='Categories'>
       <div className="container">
       <div className="header">
        <div className="info">
          <h2>Explore All Print and Artwork</h2>
          <p>India's largest collection of wall posters for your bed</p>
        </div>
        <div className="sort-by">
          <div className="sort-by-container">
            <h3 className='sort-by-text'>Sort By</h3>
            <select className='select-sort-by' name="sort-by" id="sort-by" onChange={handleSortChange}>
               {sortOptions.map(item=><option value={item.sort}>{item.value}</option>)}
            </select>
          </div>
        </div>
       </div>

       <div className="content">
        <div className="filter-box">
          <h3>Category</h3>
          {categories?.map(item=>(
            <div key={item.id} className="filter-radio">
            <input name='category' type="radio" value={item?.attributes.key} id={item.id} onChange={updateCategory} checked={item.attributes.key === params.categoryId} />
            <label htmlFor={item.id} >{item.attributes.title}</label>
          </div>
          ))}
          
        </div>
        <div className="product-box">
           {products?.map(product=><Product key={product.id} product={product}/>)}
        </div>
       </div>
       </div>
    </div>
  )
}

export default Categories

