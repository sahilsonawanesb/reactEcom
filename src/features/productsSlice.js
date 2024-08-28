// importing methods
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { addNewProduct, delProduct, getProducts } from "../assets/JS";

// initial state
const initialState = {    
    list: [],
    productOnFocus : {},
    loading: false,
    error: {
        status: false,
        message : ''
    }
}

// fetches all products
export const fetchProductsFromDB = createAsyncThunk(
    // action name
    'products/fetchProducts',
    // thunk middleware
    async (userData, { fulfillWithValue, rejectWithValue }) => {
        try {
            // API call
            const response = await getProducts();
            // on success
            if (response.success) {
                return fulfillWithValue(response.data);
            } else {
                return rejectWithValue(response.error)
            }  
        // catch error
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)

// add products 
export const addProductToDB = createAsyncThunk(
    // action name
    'products/addProduct',
    // thunk middleware
    async (newProduct, { dispatch, rejectWithValue }) => {
        try {
            // API call
            const response = await addNewProduct(newProduct);
            // on success
            if (response.success) {
                dispatch(addProduct(response.data));
            }
            else {
                return rejectWithValue(response.error)
            }
        // catch error
        } catch (error) {
            throw rejectWithValue(error.message)
        }
    }
);

// delete products
export const deleteProductInDB = createAsyncThunk(
    // action name
    'products/deleteProduct',
    // thunk middleware
    async (productID, { dispatch, rejectWithValue }) => {
        try {
            // if product id less than 20 delete locally i.e default data
            if (productID <= 20) {
                dispatch(deleteProduct(productID));
            }
            // ifproduct id greater than 20 i.e user added 
            else {
                // API call
                const response = await delProduct(productID);
                // on success
                if (response.success) {
                    dispatch(deleteProduct(productID));
                }
                else {
                    return rejectWithValue(response.error);
                }      
            }
        // on error
        } catch (error) {
            throw rejectWithValue(error.message);
        }
    }
);
    
// products slice
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // reset filters
        resetState:  (state) => {
            state.list.sort((a, b) => a.id - b.id);
        },
        // sort by price
        sortByPrice: (state, action) => {
            // for ascending order
            if (action.payload === 'asc') {
                state.list.sort((a, b) => a.price - b.price);
            }
            // for decreasing order
            if (action.payload === 'desc') {
                state.list.sort((a, b) => b.price - a.price);
            }
        },
        // delete product to state
        deleteProduct: (state, action) => { 
            state.list = state.list.filter((product) => product.id !== action.payload)
        },
        // add product to state
        addProduct: (state, action) => {
            state.list = [action.payload, ...state.list];
        }
        
    },
    // for thunk middleware
    extraReducers: (builder) => {
        builder.addCase(fetchProductsFromDB.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message :""
            }
            state.loading = false;
            state.list = action.payload;
        })
        builder.addCase(fetchProductsFromDB.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductsFromDB.rejected, (state,action) => {
            state.loading = false;
            state.error = {
                status: true,
                message : action.error
            }
        })
        builder.addCase(addProductToDB.fulfilled, (state) => {
            state.loading = false;
            state.error = {
                status: false,
                message: ""
            };
        })
        builder.addCase(addProductToDB.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addProductToDB.rejected, (state,action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            };
        })
        
    }
});

// export action
export const {
    deleteProduct,
    sortByPrice,
    resetState,
    addProduct,
} = productsSlice.actions;

// export reducers
export default productsSlice.reducer;