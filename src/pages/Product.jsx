// importing react methods
import { useEffect, useState } from "react";

// importing React-router methods
import { useNavigate, useParams } from "react-router-dom";

// importing React-redux methods
import { connect, useDispatch, useSelector } from "react-redux";

// importing MUI components and styles
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TextField from "@mui/material/TextField";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { styled } from '@mui/material/styles';

// importing components
import { Loader } from "../components";

// importing actions and reducers
import {
    fetchProductFromDB,
    editProductOnDB,
    fetchProductsFromDB,
    addItemIncart,
} from "../features";

// for notification
import { toast } from "react-toastify";


// for uploading Image
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

const Product = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading,
        product,
        edit,
        addToCart 
    } = props;

    // state variables
    const [added, setAdded] = useState(false);
    const  productID  = parseInt(useParams().productID);
    const err = useSelector(state => state.product.error);
    const [editModeActive, setEditModeActive] = useState(false);
    const [title, setTitle] = useState(product.title);
    const [image, setImage] = useState(product.image);
    const [rating, setRating] = useState(product.rating | 0);
    const [price, setPrice] = useState(product.price | 0);
    const [description, setDescription] = useState(product.description);
     
    useEffect(() => {
          
        if (productID !== product.id) {            
            dispatch(fetchProductFromDB(productID));
            if (err.status) {
                toast.error(`${err.message}`)
                navigate('/');
            }
        }

        // setting up edit variables
        setTitle(product.title);    
        setImage(product.image);
        setPrice(product.price); 
        setRating(product.rating);    
        setDescription(product.description);
          
    }, [editModeActive,product,dispatch]);

    // function to handle add to cart action
    const handleAddToCart = (productID) => {
        if (added) {
            toast.info("Product in cart please check");
            return;
        }
        
        // notification
        addToCart(productID);

        // notification
        toast.success("Product added to Cart..!!");

        setAdded(true);
    }

    // function to handle image uplaod
    const handleImageChange = (e) => {
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    // function to handle submit button click
    const handleSubmit = (productId) => {
        // new product
        const editedProduct = {
            title: title,
            price: parseFloat(price.replace(/,/g,""))/30,
            description: description,
            rating: rating,
            image: !image
                ? "https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg"
                : image 
        }
        console.log("[pr", product);
        console.log("edi", editedProduct);

        // notification
        toast.promise(
            // dispatch edit action
            edit(editedProduct,productID),
            {
                pending: 'Edit en route..!!',
                success: 'Edit Successfull..!!',
                error: 'Error in editing product..!!!'
              }
        )

        // reload product list
        dispatch(fetchProductsFromDB());
        
        setEditModeActive(false);
    }

    // Loader
    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            
            {editModeActive
                ? (
                    // edit mode active
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            mt: 2, mb: 1, p: 1,
                        }}
                    >
                        {/* left section or image section start */}
                        <Box sx={{
                            position: "relative",
                            minWidth: 450,
                            mt: 3, ml: 3, p: 1,
                            backgroundColor: "#f7f7f7"
                        }}>

                            {/* upload image button start*/}
                            <Button
                                sx={{
                                    position: 'absolute',
                                    zIndex: 2, left: "30%",
                                    top: "40%",
                                }}
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >                 
                                Upload file

                                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                            </Button>
                            {/* upload image button end*/}
                        
                            {/* display uplaoded image start */}
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 400,
                                    objectFit: "contain",
                                    opacity: 0.85,
                                }}
                                image={image}
                                alt="product.jpg"
                            />
                            {/* display uplaoded image start */}

                        </Box>
                        {/* left section end */}

                        {/* right section start */}
                        <Box
                            sx={{
                                height: 450,
                                minWidth: 800,
                                ml: 4, mt: 4, mb: 1, p: 1,
                                border: "1px solid black"
                                }}
                        >
                            {/* cart info start */}
                            <CardContent
                                sx={{
                                    flex: '1 0 auto',
                                    textAlign: "left",
                                    height: "100%"
                                }}>
                                
                                {/* product title start*/}
                                <FormControl
                                    fullWidth
                                    variant="standard"
                                    sx={{ mb: 3 }}
                                >
                                    <InputLabel sx={{fontWeight : 600, fontSize:20}}> Product Title </InputLabel>
                                    <Input
                                        name="title"
                                        defaultValue={title}
                                        onChange={(e)=>setTitle(e.target.value)}
                                    />
                                </FormControl>
                                {/* product title end */}

                                {/* product price start*/}
                                <FormControl
                                    variant="standard"
                                    sx={{ mb: 3 }}
                                >
                                    <InputLabel  sx={{fontWeight : 600, fontSize:20}}> Product Price </InputLabel>
                                    <Input
                                        name = "price"
                                        startAdornment={<InputAdornment position="start"> &#8377; </InputAdornment>}
                                        defaultValue={Intl
                                            .NumberFormat("en-US", { maximumFractionDigits: 2 })
                                            .format(price * 30)
                                        }
                                        onChange={(e)=>setPrice(e.target.value)}
                                    />
                                </FormControl>
                                {/* product price end */}

                                {/* product rating start*/}
                                <FormControl
                                    variant="standard"
                                    sx={{ mb: 3, ml: 3 }}
                                >
                                    <InputLabel sx={{fontWeight : 600, fontSize:20}}> Rating </InputLabel>
                                    <Input
                                        name="rating"
                                        defaultValue={rating}
                                        onChange={(e)=>setRating(e.target.value)}
                                    />
                                </FormControl>
                                {/* product rating end */}

                                 {/* product description start*/}
                                <FormControl
                                    fullWidth
                                    variant="standard"
                                    sx={{ mb: 3 }}
                                >
                                    <TextField
                                        name="description"
                                        label="Product Description"
                                        multiline
                                        defaultValue={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </FormControl>
                                {/* product description end */}

                                {/* Save button start */}
                                <IconButton
                                    onClick={()=>handleSubmit(productID)}
                                    size="large"
                                >
                                    <SaveOutlinedIcon fontSize="large" color="info" />
                                </IconButton>
                                {/* Save button end */}
              
                            </CardContent> 
                            {/* cart info end */}

                        </Box>
                        {/* right section start */}

                    </Box>
                ) : (
                    // edit mode  unactive
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            mt: 2, mb: 1, p: 1,
                            justifyContent : "center"
                            }}
                    >
                        {/* display image start */}
                        <CardMedia
                            component="img"
                            sx={{
                                width: 400,
                                objectFit: "contain",
                                backgroundColor: "#f7f7f7"}}
                                image={product.image}
                                alt="product.jpg"
                        />
                        {/* display image end */}

                        {/* product info start */}
                        <Box
                            sx={{
                                position : "relative",
                                height: 450,
                                width: 800,
                                ml: 4, mt: 4, mb: 1, p: 1,
                                border: "1px solid black"
                                }}
                        >
                            {/* product info content satrt*/}
                            <CardContent sx={{ flex: '1 0 auto', textAlign: "left" }}>
                                
                                {/* product title start */}
                                <Typography
                                    component="div"
                                    variant="h5"
                                    noWrap
                                    fontSize={40}
                                    fontWeight={700}
                                >
                                    {product.title}
                                </Typography>
                                {/* product title end */}
                                
                                {/* product price start */}
                                <Typography 
                                    variant="h4"
                                    color="text.tertiary"
                                    fontWeight={600}
                                >
                                    &#8377; &nbsp;
                                    {Intl
                                        // formating price upto 2 decimals
                                        .NumberFormat("en-US", { maximumFractionDigits: 2 })                                        
                                        .format(product.price * 30
                                    )}   
                                </Typography>
                                {/* product price end */}
                
                                {/* product rating start */}
                                <Typography                                           
                                    component="span"
                                    variant='h6'
                                    fontSize={25}                               
                                >   
                                    {/* display stars */}
                                    <Rating                                                  
                                        precision={0.1}
                                        value={parseInt(product.rating)}
                                        sx={{                                                       
                                            ml: 1,
                                            verticalAlign: "sub",
                                            color: "goldenrod",}}
                                            emptyIcon={
                                                <StarOutlineIcon sx={{ color: "black" }} />
                                            }
                                            readOnly                                       
                                    />                                 
                                </Typography>
                                {/* product rating end */}
                                        
                                {/* product description start */}
                                <Typography
                                    fontSize={25}
                                    sx={{
                                        typography: {
                                            sm: 'body1',
                                            xs: 'body2'
                                        }
                                    }}
                                >           
                                    {product.description}                                         
                                </Typography>
                                {/* product description end */}

                                {/* action button start */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 4,
                                    }}
                                >             
                                    {/* Add to Cart button */}
                                    <Button                                                            
                                        variant="text"       
                                        sx={{                                                           
                                            color: "goldenrod",                                        
                                            border: "2px solid orange",                                        
                                        }}                                    
                                        startIcon={<AddCircleOutlineOutlinedIcon />}
                                        onClick={() => { handleAddToCart(product.id) }}
                                    >
                                        Add To Cart..
                                    </Button>                    

                                    {/* edit button */}
                                    <IconButton
                                        onClick={() => setEditModeActive(true)}
                                        size="large"
                                    >
                                        <EditOutlinedIcon
                                            fontSize="large"
                                            color="info"
                                        />
                                    </IconButton>

                                </Box>
                                {/* action button end*/}

                            </CardContent> 
                            {/* product info content end */}
                        </Box>
                        {/* product info end */}
                    </Box>
                )}      
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        product: state.product.product,
        isloading: state.product.loading,

    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProduct: (productId) => dispatch(fetchProductFromDB(productId)),
        addToCart: (productID) => dispatch(addItemIncart(productID)),
        edit: (editedProduct, productID ) => dispatch(editProductOnDB({ editedProduct, productID }))

    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Product);