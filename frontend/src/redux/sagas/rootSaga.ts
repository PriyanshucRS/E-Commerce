
import {watchFetchProducts} from './productSaga'
import {all} from "redux-saga/effects"
import {watchAuthSaga} from '../sagas/authSaga'
export default function* rootSaga() {
    yield all([
       watchFetchProducts() ,
       watchAuthSaga()
    ])
}
