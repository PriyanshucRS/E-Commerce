import { put, call, takeLatest } from "redux-saga/effects";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../Slices/authSlice";
import { regApi, loginApi } from "../api-services/authService";

function* handleRegister(action: any) {
  try {
    const data = yield call(regApi, action.payload);
    yield put(registerSuccess(data));
  } catch (error: any) {
     const errorMessage = error.response?.data || error.message;
    yield put(registerFailure(errorMessage));
  }
}

function* handleLogin(action: any) {
  try {
    const data = yield call(loginApi, action.payload);
    yield put(loginSuccess(data));
    localStorage.setItem("token", data.token);
  } catch (error: any) {
     const errorMessage = error.response?.data || error.message;
    yield put(loginFailure(errorMessage));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(loginRequest.type, handleLogin);
}
