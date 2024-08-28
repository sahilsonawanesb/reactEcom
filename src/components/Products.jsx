// importing libraries
import { Link } from "react-router-dom";
import { connect, useDispatch,useSelector } from 'react-redux';
import { toast } from "react-toastify";

// importing MUI component
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Typography from '@mui/material/Typography';

// importing actions and reducers
import { deleteProductInDB } from '../features';


const Products = (props) => {
  const {products, deleteProductFromlist } = props
  const defaultImg = 'https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg';
  
// function to delete product
  const handleDeleteClick = (id) => {
    // handles notification
    toast.promise(
      deleteProductFromlist(id),
      {
        pending: 'Product is being deleted..!!',
        success: 'Produuct Deleted..!!',
        error: 'Error in deleting product..!!!'
      }
  )
  }

    return (
      <>
                  
        {/* Container to display all products */}
        <Grid
          container
          direction="row"
          spacing={1}
          textAlign={"center"}
          justifyContent={"center"}
        >

          {/* Looping the displaying products */}
          {products.map((product, index) => {   
            return (

              // individual product display starts
              <Grid
                item
                zeroMinWidth
                xl
                key={index}  
              >

                <Box sx={{
                  position: "relative",
                  width: 300,
                  height : 350,
                  mt: 1, mb: 1, p:1,
                  border : "1px solid black"
                }}
                >
                  {/* displays product image starts*/}
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "contain",
                      backgroundColor : "#f7f7f7"                    
                    }}
                    image={product.image || defaultImg}
                    alt="product.jpg"
                  />
                  {/* displays product image ends*/}
                      
                  {/* delete button starts */}                 
                  <IconButton
                    onClick={() => handleDeleteClick(product.id)}
                    size="large"
                    sx={{
                      position: "absolute",
                      right: 2,
                      top: 2,
                      color : "red"
                    }}
                  >
                    <DeleteOutlineRoundedIcon fontSize="large" />
                  </IconButton>
                  {/* delete button ends*/}  
            
                  {/* current products info starts*/}
                  <Link
                    style={{
                      textDecoration: "none",      
                      color: "inherit"    
                    }}    
                    to={`/products/${product.id}`}
                  >
                    {/* product info  starts*/}
                    <CardContent
                      sx={{
                        flex: '1 0 auto',
                        textAlign: "left"
                      }}>

                      {/* display title */}
                      <Typography component="div" variant="h5" noWrap>
                        {product.title}
                      </Typography>

                      {/* display rating */}
                      <Typography component="span" variant='h6' >
                        {/* rating star */}
                        <Rating
                          precision={0.1}
                          value={parseInt(product.rating)}
                          sx={{
                            ml: 1,
                            verticalAlign: "sub",
                            color: "yellowgreen",
                          }}
                          emptyIcon={
                            <StarOutlineIcon sx={{ color: "black" }} />
                          }
                          readOnly
                        />
                      </Typography>

                      {/* product price */}
                      <Typography variant="h4" color="text.secondary" fontWeight={500} >
                      &#8377; {
                          // formats price upto 2 decimal
                          Intl
                            .NumberFormat("en-US", { maximumFractionDigits: 2 })
                            .format(product.price * 30)
                        }
                      </Typography>

                    </CardContent>
                    {/* product info section ends */}

                  </Link>
                  {/* current products info  ends*/}

                </Box>
                
              </Grid>
              // individual product display ends

            )
          })} 
          
        </Grid>
        {/* Container to display all products */}

      </>
    )
}

const mapStateToProps = (state) => {
  return {
    products: state.products.list
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProductFromlist : (productId) =>  dispatch(deleteProductInDB(productId)) ,
    
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);