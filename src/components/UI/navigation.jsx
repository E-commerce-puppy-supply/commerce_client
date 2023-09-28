import Products from './Products'
import Login from '../Pages/Login'
import Cart from '../Pages/Cart'
import Profile  from '../Pages/Profile'
import Register from '../Pages/Register'
import SingleProduct from './SingleProduct'
import Home from '../Pages/Home'

export const nav = [
    { path: "/login",    name: "Login",   element: <Login />,    isMenu: false, isPrivate: false },
    { path: "/",         name: "Product", element: <Products />, isMenu: true,  isPrivate: false },
    { path: "/cart",     name: "Cart",    element: <Cart />,     isMenu: true,  isPrivate: false },
    { path: "/profile",  name: "Profile", element: <Profile />,  isMenu: true,  isPrivate: true },
    { path: "/register", name:"Register", element: <Register />, isMenu: false, isPrivate: false},
    { path: "/product/:id", name: "Single Product", element: <SingleProduct />, isMenu: false, isPrivate: false},
    { path: "/home",        name: "Home",   element: <Home />,   isMenu: true,  isPrivate: false}
]