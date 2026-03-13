import { put, call, takeLatest } from "redux-saga/effects";

import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateCartQuantityFailure,
  updateCartQuantityRequest,
} from "../Slices/cartSlice";

import {
  addToCartApi,
  fetchCartApi,
  deleteCartApi,
  updateCartQuantityApi,
} from "../api-services/addToCartApi";

function* handleAddToCart(action: any) {
  try {
    const updatedCart = yield call(addToCartApi, action.payload);

    yield put(addToCartSuccess(updatedCart));
  } catch (error: any) {
    yield put(addToCartFailure(error.message));
  }
}

function* handleFetchCart() {
  try {
    const cartData = yield call(fetchCartApi);
    yield put(fetchCartSuccess(cartData.data || cartData));
  } catch (error: any) {
    yield put(fetchCartFailure(error.message));
  }
}

function* handleDeleteCart(action: any) {
  try {
    const res = yield call(deleteCartApi, action.payload);
    yield put(removeFromCartSuccess(res));
  } catch (err: any) {
    yield put(removeFromCartFailure(err.message));
  }
}

function* handleUpdateQuantity(action: any) {
  try {
    const updatedCart = yield call(
      updateCartQuantityApi,
      action.payload.id,
      action.payload.quantity,
    );
    yield put(fetchCartSuccess(updatedCart.data || updatedCart));
  } catch (error: any) {
    yield put(updateCartQuantityFailure(error.message));
  }
}

export function* watchCartSaga() {
  yield takeLatest(addToCartRequest.type, handleAddToCart);
  yield takeLatest(fetchCartRequest.type, handleFetchCart);
  yield takeLatest(removeFromCartRequest.type, handleDeleteCart);
  yield takeLatest(updateCartQuantityRequest.type, handleUpdateQuantity);
}
