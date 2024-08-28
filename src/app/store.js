// importing method
import { configureStore } from "@reduxjs/toolkit";

// importing reducers
import productsSlice from "../features/productsSlice";
import productSlice from "../features/productSlice";
import cartSlice from "../features/cartSlice";

// exporting store
export const store = configureStore({
    reducer: {
        products: productsSlice,
        product: productSlice,
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }),
})