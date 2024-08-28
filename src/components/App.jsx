// importing libraries
import { useEffect } from 'react'
import { connect} from 'react-redux'
import { Route,Routes} from 'react-router-dom'

// importing local components
import { Navbar } from './index'
import {
  Home,
  NotFound,
  AddProduct,
  Cart,
  Product
} from '../pages'

// importing actions and reducers for React-Redux
import {
  fetchCartItemsOfUser,
  fetchProductsFromDB,
} from '../features'

// importing Styles
import '../assets/styles/App.css'


function App(props) {

  // destructuring props
  const { userID,
    getCartItems,
    getProducts,
    dispatch,
    getProductsInCart,
  } = props;

  // fetching products and cart
  useEffect(() => {    
    getProducts();
    getCartItems(userID);
  }, [dispatch]);

  return (
    <>
      
      <Navbar 
        userID={userID}
      />
      {/* Routes for diffrent Pages */}
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/products/:productID' element={<Product />}/>
        <Route path='/add' element={<AddProduct />} />
        <Route path='/user/cart' element={<Cart userID={userID}  />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

// Sending  Props to App
const mapStateToProp = (state,ownProp) => {
  const { userID } = ownProp;
  return {
    userID,
  }
}

// Sending actions dispatch 
const mapDispatchToProps = (dispatch) => ({ 
  getCartItems: (id) => dispatch(fetchCartItemsOfUser(id)),
  getProducts: () => dispatch(fetchProductsFromDB()),
})

// exporting App
export default connect(mapStateToProp,mapDispatchToProps)(App);
