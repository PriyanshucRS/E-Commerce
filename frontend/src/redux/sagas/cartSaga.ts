import { put, call, takeLatest } from "redux-saga/effects";

import { 
  addToCartRequest, 
  addToCartSuccess, 
  addToCartFailure, 
  fetchCartRequest, 
  fetchCartSuccess, 
  fetchCartFailure 
} from "../Slices/cartSlice"; 

import { addToCartApi, fetchCartApi } from "../api-services/addToCartApi"; 

function* handleAddToCart(action: any) {
  try {
    const updatedCart = yield call(addToCartApi, action.payload);
    
    yield put(addToCartSuccess(updatedCart)); 
    console.log("Cart updated successfully");
  } catch (error: any) {
    yield put(addToCartFailure(error.message));
  }
}


function* handleFetchCart() {
  try {
    const cartData = yield call(fetchCartApi);
    yield put(fetchCartSuccess(cartData));
  } catch (error: any) {
    yield put(fetchCartFailure(error.message));
  }
}


export function* watchCartSaga() {

  yield takeLatest(addToCartRequest.type, handleAddToCart);
  yield takeLatest(fetchCartRequest.type, handleFetchCart);
}
