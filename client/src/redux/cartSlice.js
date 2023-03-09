import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../Utils/axiosClient'

// First, create the thunk
// export const fetchCategories = createAsyncThunk(
//   'api/fetchcategory',
//   async (_, thunkAPI) => {
//     try {
//         const response = await axiosClient.get('/categories?populate=image')
//     return response.data.data
//     } catch (error) {
//         return Promise.reject(error)
//     }
//   }
// )




// Then, handle actions in your reducers:
const cartSlice = createSlice({
  name: 'cartSlice',
  initialState:{
        cart:[]
  },
  reducers: {
    addToCart:(state,action)=>{
        const product = action.payload.attributes
        const curItems =product ? {
            title:product.title,
            key:product.key,
            price:product.price,
            image:product.image.data.attributes.url
        } : action.payload
        const index = state.cart.findIndex(item=>item.key === curItems.key)
        if(index === -1){
            state.cart.push({...curItems,quantity:1})
        }else{
            state.cart[index].quantity +=1;

        }
    },

    removeFromCart:(state,action)=>{
        const curItems = action.payload.attributes || action.payload;
        const index = state.cart.findIndex(item=>item.key === curItems.key)
        if(index === -1) return ;
        if(state.cart[index].quantity === 1){
            state.cart = state.cart.filter(item => item.key !== curItems.key)
        }else{
            state.cart[index].quantity -= 1;
        }
    },

    resetCart:(state,action)=>{
        state.cart=[]
    }
  },
 
})

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions

export default cartSlice.reducer