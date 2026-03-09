import {put ,call, takeLatest} from 'redux-saga/effects'
import {
  regitsterRequest, regitsterSuccess,regitsterFailure,loginRequest,
  loginSuccess,loginFailure
} from '../Slices/authSlice'
import {regApi,loginApi} from '../api-services/authService'


function* handleRegister(action: any){
   try {
     const data = yield call(regApi,  action.payload);
     yield put(regitsterSuccess(data))
     

   } catch (error : any) {
          yield put(regitsterFailure(error.message))
   }
}



function* handleLogin(action: any){
   try {
     const data = yield call(loginApi, action.payload);
     yield put(loginSuccess(data))
      localStorage.setItem("token", data.token);
     

   } catch (error : any) {
          yield put(loginFailure(error.message))
   }
}

export function* watchAuthSaga(){
  yield takeLatest(regitsterRequest.type,handleRegister)
    yield takeLatest(loginRequest.type,handleLogin)
}