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
import {
  addProductApi,
  fetchProductsApi,
  deleteProductApi,
} from "../api-services/productApi";
import { toastSuccess, alertError } from "../../utils/alerts";

function* addProductSaga(action: any) {
  try {
    yield call(addProductApi, action.payload);

    const updatedProducts = yield call(fetchProductsApi);
    yield put(fetchProductSuccess(updatedProducts.data || updatedProducts));

    toastSuccess("Success!", "Product added successfully!");
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || err.message;
    yield put(addProductFailure(errorMsg));

    alertError("Error!", errorMsg || "Failed to add product");
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

    toastSuccess("Deleted!", "Product deleted successfully.");
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || err.message;

    yield put(deleteProductFailure(errorMsg));

    if (errorMsg.includes("only delete")) {
      alertError("Unauthorized!", "You can only delete your own products!");
    } else {
      alertError("Error!", errorMsg || "Failed to delete product");
    }
  }
}

export function* watchFetchProducts() {
  yield takeLatest(addProductRequest.type, addProductSaga);
  yield takeLatest(fetchProductRequest.type, fetchProductSaga);
  yield takeLatest(deleteProductRequest.type, deleteProductSaga);
}
