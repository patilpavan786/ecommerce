export const USER = 'USER';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const  LOGOUT_USER = 'LOGOUT_USER';
// Rest of the action creator functions...


export const searchProducts = (searchValue) => {
  return {
    type: SEARCH_PRODUCTS,
    payload: searchValue,
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const addToFavorites = (product) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: product,
  };
};

export const removeFromFavorites = (productId) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: productId,
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};