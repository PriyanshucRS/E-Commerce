import { put, call, takeLatest } from "redux-saga/effects";
import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  addProductFailure,
  addProductRequest,
  deleteProductRequest,
  deleteProductFailure,
} from "../Slices/productSlice";
import { addProductApi, fetchProductsApi, deleteProductApi } from "../api-services/productApi";
import Swal from "sweetalert2";

function* addProductSaga(action: any) {
  try {
    yield call(addProductApi, action.payload);
    
   
    const updatedProducts = yield call(fetchProductsApi);
    yield put(fetchProductSuccess(updatedProducts.data || updatedProducts));
    
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
    
    const fetchProducts = yield call(fetchProductsApi);
    yield put(fetchProductSuccess(fetchProducts.data || fetchProducts));
  } catch (err: any) {
    yield put(fetchProductFailure(err.message));
  }
}

function* deleteProductSaga(action: any) {
  try {
    yield call(deleteProductApi, action.payload);
    
    const updatedProducts = yield call(fetchProductsApi);
    yield put(fetchProductSuccess(updatedProducts.data || updatedProducts));
  
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
