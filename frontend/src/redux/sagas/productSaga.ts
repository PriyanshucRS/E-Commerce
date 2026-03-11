import { put, call, takeLatest } from "redux-saga/effects";
import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  addProductSuccess,
  addProductFailure,
  addProductRequest,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} from "../Slices/productSlice";
import { addProductApi, fetchProductsApi ,deleteProductApi } from "../api-services/productApi";

function* addProductSaga(action: any) {
  try {
    const newProdcuts = yield call(addProductApi, action.payload);
    yield put(addProductSuccess(newProdcuts));
  } catch (err: any) {
    yield put(addProductFailure(err.message));
  }
}

function* fetchproductSaga() {
  try {
    const fetchProdcuts = yield call(fetchProductsApi);

    yield put(fetchProductSuccess(fetchProdcuts.data || fetchProdcuts));
  } catch (err: any) {
    yield put(fetchProductFailure(err.message));
  }
}

function* deleteProductSaga(action: any) {
  try {
    yield call(deleteProductApi, action.payload);
    yield put(deleteProductSuccess(action.payload));
  } catch (err: any) {
    yield put(deleteProductFailure(err.message));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(addProductRequest.type, addProductSaga);
  yield takeLatest(fetchProductRequest.type, fetchproductSaga);
  yield takeLatest(deleteProductRequest.type, deleteProductSaga); 
}
