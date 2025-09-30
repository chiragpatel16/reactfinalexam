import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../Slices/productSlice"

export const Store = configureStore ({
    reducer : {
         product : productReducer,
    }
})
