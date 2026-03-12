import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  addProductFailure,
  addProductRequest,
  deleteProductRequest,
  deleteProductFailure,
} from "../Slices/productSlice";
import { addProductApi, fetchMyProductsApi, fetchProductsApi, deleteProductApi } from "../api-services/productApi";
import type { RootState } from "../store/store";
import Swal from "sweetalert2";

function* addProductSaga(action: any) {
  try {
    yield call(addProductApi, action.payload);
    
   
    const state: RootState = yield select();
    const user = state.auth.user;
    
    if (user) {
      const updatedProducts = yield call(fetchMyProductsApi);
      yield put(fetchProductSuccess(updatedProducts.data || updatedProducts));
    }
    
    Swal.fire({
      title: "Success!",
      text: "Product added successfully! 🎉",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || err.message;
    yield put(addProductFailure(errorMsg));
    
    Swal.fire({
      title: "Error!",
      text: errorMsg || "Failed to add product",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

function* fetchProductSaga() {
  try {
    
    const state: RootState = yield select();
    const user = state.auth.user;

    let fetchProdcuts;
    if (user) {
     
      fetchProdcuts = yield call(fetchMyProductsApi);
    } else {
      
      fetchProdcuts = yield call(fetchProductsApi);
    }

    yield put(fetchProductSuccess(fetchProdcuts.data || fetchProdcuts));
  } catch (err: any) {
    yield put(fetchProductFailure(err.message));
  }
}

function* deleteProductSaga(action: any) {
  try {
    yield call(deleteProductApi, action.payload);
    
    const state: RootState = yield select();
    const user = state.auth.user;
    
    if (user) {
      const updatedProducts = yield call(fetchMyProductsApi);
      yield put(fetchProductSuccess(updatedProducts.data || updatedProducts));
    } else {
      const updatedProducts = yield call(fetchProductsApi);
      yield put(fetchProductSuccess(updatedProducts.data || updatedProducts));
    }
  
    Swal.fire({
      title: "Deleted!",
      text: "Product deleted successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || err.message;
    
    yield put(deleteProductFailure(errorMsg));
    
    if (errorMsg.includes("only delete")) {
      Swal.fire({
        title: "Unauthorized!",
        text: "You can only delete your own products!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: errorMsg || "Failed to delete product",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}

export function* watchFetchProducts() {
  yield takeLatest(addProductRequest.type, addProductSaga);
  yield takeLatest(fetchProductRequest.type, fetchProductSaga);
  yield takeLatest(deleteProductRequest.type, deleteProductSaga);
}
