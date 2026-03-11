import { watchFetchProducts } from "./productSaga";
import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./authSaga";
import { watchCartSaga } from "./cartSaga";
import { watchWatchlistSaga } from "./watchlistSaga";

export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchAuthSaga(),
    watchCartSaga(),
    watchWatchlistSaga(),
  ]);
}
