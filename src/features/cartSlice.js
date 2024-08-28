// importing redux methods
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
// importing functions
import { getCartItems, getProduct } from "../assets/JS";


// initial cart state
const initialState = {    
    cartItems: [],
    products:[],
    loading: false,
    error: {
        status: false,
        message: ""
    },
}

// fetches cart
export const fetchCartItemsOfUser = createAsyncThunk(
    // action name
    'carts/fetchCartItems',
    // thunk middleware
    async (userId, { fulfillWithValue, rejectWithValue }) => {
        try {
            // API Call
            const response = await getCartItems(userId);
            // on success
            if (response.success) {
                return fulfillWithValue(response.data[0]);
            } else {
                return rejectWithValue(response.error)
            }
        // on error
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)

// adds item to cart
export const addItemIncart = createAsyncThunk(
    // action name
    'carts/addItemIncart',
    // thunk middleware
    async (productID, {getState,rejectWithValue,fulfillWithValue}) => {
        try {

            const response = await getProduct(productID);

            if (response.success) {
                return {      
                    product: {
                        id: getState().cart.products.length,
                        price: response.data.price,
                        title: response.data.title,
                        image: response.data.image
                    },
                    quantity: 1
                }
                
            } else {
                return rejectWithValue(response.error)
            }
            
            // // if it doesn't exist create one
            // if (!check) {
            //     return fulfillWithValue({
            //         product: {
            //             id: getState().cart.products.length + 1 | 1,
            //             price: product.price,
            //             title: product.title
            //         },
            //         quantity: 1
            //     })
            // }

        // on error 
        } catch (error) {
            throw  rejectWithValue(error.message)
        }
    }  
)
 
//  cartSlice
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increaseQuantity: (state, action) => {

            state.products = state.products.map((product) => {
                if (action.payload === product.product.id ) {
                    product.quantity += 1;
                }
                return product;
            })
        },
        decreaseQuantity: (state, action) => {
            
            state.products = state.products.map((product) => {
                if (action.payload === product.product.id && product.quantity >= 1) {
                    product.quantity -= 1;
                }
                return product;
            })
            
        },
        deleteItemInCart: (state, action) => {
            state.products = state.products.filter((product) => {
                return product.product.id !== action.payload
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItemsOfUser.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message: ""
            }
            state.loading = false;
            state.cartItems = action.payload;;
        })
        builder.addCase(fetchCartItemsOfUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCartItemsOfUser.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            }
        })
        builder.addCase(addItemIncart.fulfilled, (state, action) => {
            state.error = {
                status: false,
                message: ""
            }

            if (action.payload.product) {
                state.products.push(action.payload);
            }
            else {
                state.products = state.products.map((product) => {
                    if (action.payload === product.product.id) {
                        product.quantity += 1;
                    }
                    return product;
                })
            }

        })
        builder.addCase(addItemIncart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addItemIncart.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                status: true,
                message: action.error
            }
        })
    }
});

export const {
    decreaseQuantity,
    increaseQuantity,
    deleteItemInCart,
} = cartSlice.actions;

export default cartSlice.reducer;