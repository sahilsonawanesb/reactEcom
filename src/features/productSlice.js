// importing redux method
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
// importing function
import { editProduct, getProduct } from "../assets/JS";

// initial product
const initialState = {    
    product: [],
    loading: false,
    error: {
        status: false,
        message : ''
    }
}

// fetches a  single  product
export const fetchProductFromDB = createAsyncThunk(
    // action name
    'products/fetchProduct',
    // thunk middleware
    async (productID, { fulfillWithValue, rejectWithValue }) => {
        try {
            // API call
            const response = await getProduct(productID);
            // on success
            if (response.success) {
                return fulfillWithValue(response.data);
            } else {
                return rejectWithValue(response.error)
            }  
        // on error
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)

// edit product
export const editProductOnDB = createAsyncThunk(
    // action name
    'products/editProduct',
    // thunk middleware
    async (userData, { dispatch, rejectWithValue }) => {
        const { editedProduct, productID } = userData;
        try {
            // API call
            const response = await editProduct(editedProduct, productID);
            // on success
            if (response.success) {
                dispatch(edit(response.data));
            } else {
                return rejectWithValue(response.error)
            } 
        // on error
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)

// productslice
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // edit product
        edit: (state, action) => {
            state.product = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductFromDB.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message :""
            }
            state.loading = false;
            state.product = action.payload;
        })
        builder.addCase(fetchProductFromDB.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProductFromDB.rejected, (state,action) => {
            state.loading = false;
            state.error = {
                status: true,
                message : action.payload
            }
        })
        builder.addCase(editProductOnDB.pending, (state) => {
            state.loading = true;
        })
        
    }
});

// exporting action
export const {
    edit
} = productSlice.actions;

// exporting reducer
export default productSlice.reducer;