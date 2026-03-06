import { put, call, takeLatest } from "redux-saga/effects";
import { fetchProductRequest,fetchProductSuccess, fetchProductFailure } from "../Slices/productSlice";
import { productApi } from "../services/productApi";
import { API_URL } from "../constants/api";

function* fetchProduct() {
  try {
    
    const res = yield  call(productApi.get, API_URL.PRODUCTS);
     
    yield put(fetchProductSuccess(res.data));
  } catch (err: any) {
    yield put(fetchProductFailure(err.message));
   
  }
}

export function* watchFetchProducts() {
  yield takeLatest(
    fetchProductRequest.type ,fetchProduct
  )
}
