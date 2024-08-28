// import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

// importing router dom component
import { Link } from 'react-router-dom';

// importing MUI Components
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Box,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// importing loader
import { Loader } from '../components';

// importing actions and reducers
import {
  decreaseQuantity,
  deleteItemInCart,
  increaseQuantity
} from '../features';

const Cart = (props) => {
  
  // destructuring props
  const { products } = props;

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.cart.loading);
  
  // loader
  if (isLoading) {
    <Loader/>
  }

  return (
    <>
      
      {/* if no item in cart render this */}
      {!products.length &&
        
        <Box
          sx={{
            width: '90vw',
            height: '50vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding : 5
            
          }}
        >
          
          <Typography
            variant='h4'
            sx={{
              position: 'relative'
            }}>
            Cart is Empty. Checkout our Home page to Add items to cart.
            
            <Link
              to={'/'}
            >

              {/* home page button */}
              <Button
                variant='contained'
                sx={{
                  display: 'block',
                  position: 'absolute',
                  left: "40%",
                  fontSize: 40,
                  mt:2
                }}
              >
                Home Page
              </Button>
            </Link>
          </Typography>
        </Box>

      }

      {/* if items in cart render this */}
      {products.length > 0 &&
        
        // conatiner start
        <Grid
          container
          spacing={2}
          sx={{
            mt: 5,
            pl: 10,
            pr: 10,
            width: "100%",
          }}
        >
          {/* display cart item start*/}
          <Grid
            item
            sx={{
              width: "80%",
            }}
          >

            {/* looping to  display cart items */}
            {products.map((item, index) => (

              // cart item conatiner start
              <Card
                key={index}
                sx={{
                  position: "relative",
                  mb: 2,
                  p: 1,
                  height: 180,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >

                {/* display product image start*/}
                <CardMedia
                  component="img"
                  sx={{
                    width: 200,
                    objectFit: "contain",
                  }}
                  image={item.product.image}
                  alt="CartItem.jpg"
                />
                {/* display product image ends */}
                
                {/* product info and action start */}
                <CardContent
                  sx={{
                    width: "60%"
                  }}>
                    
                  {/* product title */}
                  <Typography
                    variant='h6'
                    mb={2}
                    noWrap
                  >
                    {item.product.title}
                  </Typography>

                  {/* product price */}
                  <Typography
                    variant='subtitle1'
                    mb={2} ml={2}
                    noWrap>
                        
                    &#8377;

                    <Typography
                      variant='h6'
                      ml={2}
                      component="span"
                    >
                      {/* formatting price */}
                      {Intl
                        .NumberFormat("en-US", { maximumFractionDigits: 2 })
                        .format(
                          item.product.price * 30
                        )}
                    </Typography>

                  </Typography>

                  {/* action button starts */}
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      display: "flex"
                    }}
                    noWrap
                  >
                    {/* plus button */}
                    <IconButton
                      onClick={() => { dispatch(increaseQuantity(item.product.id)) }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  
                    {/* display current quantity */}
                    <Typography
                      variant='h5'
                      mt={0.5}
                      noWrap
                    >
                      {item.quantity}
                    </Typography>

                    {/* minus button */}
                    <IconButton
                      onClick={() => { dispatch(decreaseQuantity(item.product.id)) }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>

                  </Typography>
                  {/* action button ends */}
            
                </CardContent>
                {/* product info and action ends*/}
                
                {/*  Delete buttton */}
                <IconButton
                  onClick={() => dispatch(deleteItemInCart(item.product.id))}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    color: 'blue',
                    '&:hover': {
                      color: 'red'
                    }
                  }}
                >
                  <DeleteIcon fontSize='large' />
                </IconButton>

              </Card>
              // cart item conatiner ends

            ))}

          </Grid>
          {/* display cart item ends*/}

          {/* side bar to show total  start*/}
          <Grid
            item
            sx={{
              width: "20%",
              textAlign: "center",
            }}>
            
            {/* heading */}
            <Typography variant='h6' mt={5}  >
              SubTotal ({products.length} item) :
            </Typography>
          
            {/* sub total start*/}
            <Typography variant='h4' m={3} sx={{
              display: 'flex',
              justifyContent: 'center',
           
            }}>
              {/* display total */}
              <Typography
                variant=""
                mr={3}>
                &#8377;
              </Typography>
              
              {/* formatting price */}
              {Intl
                .NumberFormat("en-US", { maximumFractionDigits: 2 })
                .format(
                  products.reduce((total, item) => total + item.product.price * item.quantity, 0)
                *30 )
              }
            </Typography>
            {/* sub total start ends*/}

          </Grid>
          {/* side bar to show total  ends*/}

        </Grid>
        // conatiner ends
      }
    </>
  )
}

// sending props to component
const mapStateToProp = (state, ownProp) => {
  const { userID } = ownProp;
  const products = state.cart.products;
  const cartItems = state.cart.cartItems;

  return {
    userID,
    cartItems,
    products
  }
}

// exporting Cart component
export default connect(mapStateToProp)(Cart);
