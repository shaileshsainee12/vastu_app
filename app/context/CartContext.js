import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'VASTU_APP_CART_V1';

const CartContext = createContext(undefined);

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload || [] };
    case 'ADD_ITEM': {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      let items;
      if (exists) {
        items = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 0) + (item.quantity || 1) } : i
        );
      } else {
        items = [...state.items, { ...item, quantity: item.quantity || 1 }];
      }
      return { ...state, items };
    }
    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      let items = state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
      items = items.filter((i) => i.quantity > 0);
      return { ...state, items };
    }
    case 'REMOVE_ITEM': {
      const id = action.payload;
      return { ...state, items: state.items.filter((i) => i.id !== id) };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 const [addresses, setAddresses] = useState([]);

  // Load cart once
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CART_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          dispatch({ type: 'SET_CART', payload: parsed });
        }
      } catch (e) {
        // silent
        console.log('Cart load error', e);
      }
    })();
  }, []);

  // Persist on items change
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(state.items));
      } catch (e) {
        console.log('Cart save error', e);
      }
    })();
  }, [state.items]);

  const addItem = (item, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const getTotal = () =>
    state.items.reduce((sum, it) => {
      const price = parseFloat(it.price || it.totalPrice || 0) || 0;
      const qty = parseInt(it.quantity || 0, 10) || 0;
      return sum + price * qty;
    }, 0);

  const getItemCount = () => state.items.reduce((s, it) => s + (parseInt(it.quantity || 0, 10) || 0), 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, updateQuantity, removeItem, clearCart, getTotal, getItemCount,addresses,setAddresses }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
