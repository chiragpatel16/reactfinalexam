import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProduct = createAsyncThunk("fetchProduct", async () => {
    try {
        const res = await axios.get("http://localhost:3000/products")
        console.log("function", res.data)
        return res.data
    } catch (error) {

    }
})

export const editProduct = createAsyncThunk("editProduct", async (product) => {
    try {
        const res = await axios.put(`http://localhost:3000/products/${product.id}`, product)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const addProduct = createAsyncThunk("addProduct", async (product) => {
    try {
        const res = await axios.post("http://localhost:3000/products", product)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
    try {
        const res = await axios.delete(`http://localhost:3000/products/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    product: [],
    isLoading: true,
    error: null
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.product = action.payload
            })
            .addCase(fetchProduct.rejected, (state) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const index = state.product.findIndex(item => item.id === action.payload.id)
                state.product[index] = action.payload
            })
            .addCase(editProduct.rejected, (state) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.product = state.product.filter((item) => item.id !== action.meta.arg)
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default productSlice.reducer

