import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../Utils/axiosClient'

// First, create the thunk
export const fetchCategories = createAsyncThunk(
  'api/fetchcategory',
  async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('/categories?populate=image')
    return response.data.data
    } catch (error) {
        return Promise.reject(error)
    }
  }
)




// Then, handle actions in your reducers:
const categorySlice = createSlice({
  name: 'categorySlice',
  initialState:{
        categories:[]
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
         state.categories = action.payload
    })
  },
})

export default categorySlice.reducer