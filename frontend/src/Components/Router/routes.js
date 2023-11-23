import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import ShoppingCartPage from '../Pages/ShoppingCartPage';
import AllProductPage from '../Pages/AllProductPage';
import ProductPage from '../Pages/ProductPage';
import UserPage from '../Pages/UserPage'
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Logout from '../Logout/Logout';
import AdminPage from '../Pages/AdminPage';
import CheckoutPage from '../Pages/CheckoutPage';

const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/shoppingCart':ShoppingCartPage,
  '/allProducts':AllProductPage,
  '/product':ProductPage,
  '/user':UserPage,
  '/logout': Logout,
  '/login':LoginPage,
  '/register': RegisterPage,
  '/admin':AdminPage, 
  '/checkout': CheckoutPage

};

export default routes;
