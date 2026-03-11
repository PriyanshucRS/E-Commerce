import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productReducer from "../Slices/productSlice";
import rootSaga from "../sagas/rootSaga";
import watchlistReducer from "../Slices/watchlistSlice";
import cartReducer from "../Slices/cartSlice";
import authReducer from "../Slices/authSlice";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productReducer,
    watchlist: watchlistReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
