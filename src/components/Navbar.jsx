// importing methoos
import { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// importing MUI component
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';

const Navbar = (props) => {

  // destructuring component
  const { userID, cartSize } = props;

  // state variable
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // function to open Menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // function to open Menu
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // function to close Menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // function to open Mobile Menu
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  // Menu
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* cart button */}
      <MenuItem onClick={handleMenuClose}>
        <Link
          to={`/user/cart`}
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          My Cart
        </Link>
      </MenuItem>

      {/* add product */}
      <MenuItem>
        <Link
          to={`/add`}
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          Add Product
        </Link>
      </MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  // mobile menu
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* cart button */}
      <Link
        to={'/user/cart'}
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show x new items in cart" color="inherit">
            <Badge badgeContent={cartSize} color="secondary">    
              <ShoppingCartIcon />
            </Badge>
          </IconButton>       
          <p>My Cart</p>
        </MenuItem>
      </Link>

      {/* Add Product button */}
      <Link
        to={`/add`}
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >
        <MenuItem>
          <IconButton size="large" aria-label="account of current user" color="inherit">
            <AddShoppingCartIcon />
          </IconButton>
          <p>Add Product</p>
        </MenuItem>
      </Link>

    </Menu>
  );

    return (
      <>   
        {/* container */}
        <Box sx={{ flexGrow: 1 }} >
          {/* nav bar start */}
          <AppBar
            position="static"
          >
            <Toolbar >             
            {/* WebSite title */}
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit"}}
                to={"/"}
              >
                {/* Website title text */}    
                <Typography                            
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{
                    display: {
                      sm: "block"
                    },
                    mr: 2
                  }}             
                >
                  E-commerce                        
                
              
                </Typography>

              </Link>

              {/* create space */}
              <Box sx={{ flexGrow: 1 }} />
              
              {/* on large screen right side nave start*/}
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  }
                }}
              >
                {/* Cart Button */}     
                <Link        
                  to={`/user/cart`}         
                  style={{             
                    textDecoration: "none",             
                    color: "inherit"   
                  }}               
                >
                  <IconButton                                
                    color="inherit"                            
                    sx={{ mr: 3 }}     
                  >
                    <Badge badgeContent={cartSize} color="secondary">                 
                      <ShoppingCartIcon fontSize='large' />             
                    </Badge>
                              
                    <Typography
                      variant='6'
                      noWrap
                      component='span'
                      sx={{ml: 2 }}
                    > 
                      Cart
                    </Typography>
                  </IconButton> 
                </Link>

                {/* Add Product */}
                <Link        
                  to={`/Add`}         
                  style={{             
                    textDecoration: "none",             
                    color: "inherit"   
                  }}               
                >
                  <IconButton                                
                    color="inherit"                            
                    sx={{ mr: 3 }}     
                  >
                              
                    <Typography
                      variant='6'
                      noWrap
                      component='span'
                      sx={{ml: 2 }}
                    > 
                      Add Product
                    </Typography>
                  </IconButton> 
                </Link>

                {/* show user name */}
                <IconButton
                  edge="end"            
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{mr:2}}
                  >
                                
                  <AccountCircle fontSize='large' />
                  
                  <Typography            
                    variant='6'
                    noWrap
                    component='span'
                    sx={{ ml: 2 , textTransform : "capitalize"}}
                  >           
                    User {userID}
                  </Typography>
                </IconButton>

              </Box>
              {/* on large screen right side nave end*/}
              {/* on smaller screen right side nav start*/}
              <Box
                sx={{
                  display: {
                    xs: 'flex',
                    md: 'none'
                  }
                }}
              >  
                <IconButton
                  size="large"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >         
                  <MoreIcon />    
                </IconButton>
              </Box>
              {/* on smaller screen right side nav end*/}

            </Toolbar>   
          </AppBar>
          {/* nav bar end */}
              
          {/* render menus */}
          {renderMenu}
          {renderMobileMenu}      
        </Box>
      </>
    )
}

// sending props to navbar
const mapStateToProp = (state,ownProp) => {
  const { userID } = ownProp;
  const cartSize = state.cart.products !== undefined && Object.keys(state.cart.products).length;
  return {
    userID,
    cartSize 
  }
}

// exporting Navbar component
export default connect(mapStateToProp)(Navbar);