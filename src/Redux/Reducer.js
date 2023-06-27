import { combineReducers } from 'redux';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SEARCH_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  USER, // Import USER action type
 
} from './Action';

// Define the initial state structure
const initialState = {
  isLoggedIn: true,
  users: [],
  searchValue: '',
  cart: [],
  favorites: [],
};

export const todo = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return {
        ...state,
        isLoggedIn: true,
        users: updatedUsers,
      };
    case 'LOGIN_USER':
      const { username, password } = action.payload;
      const existingUser = state.users.find(
        (user) => user.username === username && user.password === password
      );

      if (existingUser) {
        return {
          ...state,
          isLoggedIn: true,
        };
      }

      return state;
    case 'LOGOUT_USER':
      return {
        ...state,
        isLoggedIn: false,
      };
    case SEARCH_PRODUCTS:
      const searchValue = action.payload;
      return {
        ...state,
        searchValue,
      };
    default:
      return state;
  }
};


export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      const newItem = {
        ...action.payload,
        quantity: 1,
      };
      return [...state, newItem];
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_CART':
      return initialState.cart;
    default:
      return state;
  }
};

const initialitem = [];

const favoritesReducer = (state = initialitem, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      return [...state, action.payload];
    case REMOVE_FROM_FAVORITES:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todo,
  cart: cartReducer,
  favorites: favoritesReducer,
});

export default rootReducer;