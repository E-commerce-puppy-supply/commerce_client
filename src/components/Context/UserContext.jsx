import React from 'react'
import { createContext, useContext, useReducer, useEffect} from 'react'


const UserInfo = createContext();

const IntialState = {
    username: "",
    loggedIn: false,
    cart: [],
    product: [], // maybe should use
}

export const useUser = () => {
    return useContext(UserInfo);
}

// Create a provider component and provide state and dispatch
export const UserContext = ({ children }) => {    
    const savedCart = localStorage.getItem('cart');
    const initialCart = savedCart ? JSON.parse(savedCart): IntialState.cart;

    
    const [state, dispatch] = useReducer(userReducer, {...IntialState, cart: initialCart})

    // Load cart data from Loacal storage on component mount
    useEffect(()=>{
        if(savedCart){
            dispatch({type: 'setCart', payload: JSON.parse(savedCart)})
        }
    },[]);

    // Save cart data to local storage whenever it changes
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(state.cart));
        
    }, [state.cart]);

    return (
        <UserInfo.Provider value={{ state, dispatch }}>
            {children}
        </UserInfo.Provider>
    )
}

function userReducer(state, action) {


    switch (action.type) {
        case "ADDTOCART":
            // Check if the item is already in the cart
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                // If it exists, update its quantity by 1
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    ),
                }
            } else {
                // If it dosen't exist, add it to the cart
                return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
            };
            case 'subtractFromCart':
                // Check if the item is in the cart and its quantity is greater than 1
                const subtractItem = state.cart.find(item => item.id === action.payload.id);
          
                if (subtractItem && subtractItem.qty > 1) {
                  // If it exists and the quantity is greater than 1, subtract 1 from the quantity
                  return {
                    ...state,
                    cart: state.cart.map(item =>
                      item.id === action.payload.id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                    ),
                  };
                } else {
                  // If it doesn't exist or the quantity is 1, remove it from the cart
                  return {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload.id),
                  };
                };        
        case "removeFromCart":
            // remove item from cart (remove button)
            return { ...state, cart: state.cart.filter(p => p.id !== action.payload.id) };
        case "loggedIn":
            return { ...state, LoggedIn: true };
        case "logOut":
            return { ...state, LoggedIn: false };
        case "setCart": 
                return{...state, cart: action.payload}



        default: {
            return state;
        }
    }

}
