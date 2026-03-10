import { put, call, takeLatest } from "redux-saga/effects";
import { fetchProductRequest,fetchProductSuccess, fetchProductFailure, addProductSuccess, addProductFailure , addProductRequest} from "../Slices/productSlice";
import { addProductApi , fetchProductsApi} from "../api-services/productApi";



function* addProductSaga(action:any) {
  try { 
    const newProdcuts = yield call(addProductApi,action.payload)
    yield put(addProductSuccess(newProdcuts))
    }catch(err:any) {
   yield put(addProductFailure(err.message))
}
}

function* fetchproductSaga() {
  try { 
    const fetchProdcuts = yield call(fetchProductsApi)

    yield put(fetchProductSuccess(fetchProdcuts.data || fetchProdcuts))
    }catch(err:any) {
   yield put(fetchProductFailure(err.message))
}
}




export function* watchFetchProducts() {
  yield takeLatest(fetchProductRequest.type , fetchproductSaga )
  yield takeLatest(addProductRequest.type , addProductSaga)
}
