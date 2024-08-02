// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice'; // Importar el reducer de órdenes

import { shopApi } from '../services/shopServices';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer, // Añadir el reducer de órdenes
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware),
});

setupListeners(store.dispatch);

export default store;
