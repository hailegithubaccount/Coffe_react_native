import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.product.name === action.payload.product.name && 
               item.selectedSize.label === action.payload.selectedSize.label
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        updatedItems[existingItemIndex].totalPrice = (
          parseFloat(updatedItems[existingItemIndex].product.price.replace('$', '')) * 
          updatedItems[existingItemIndex].quantity
        ).toFixed(2);
        
        return { ...state, items: updatedItems };
      } else {
        // Add new item to cart
        return { ...state, items: [...state.items, action.payload] };
      }
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload)
      };
      
    case 'CLEAR_CART':
      return { ...state, items: [] };
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product, selectedSize, quantity = 1) => {
    const totalPrice = (
      parseFloat(product.price.replace('$', '')) * quantity
    ).toFixed(2);
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        selectedSize,
        quantity,
        totalPrice
      }
    });
  };

  const removeFromCart = (index) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: index
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cartItems: cartState.items,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};