import { put, call, takeLatest } from "redux-saga/effects";
import {
  toggleWatchlistApi,
  fetchWatchlistApi,
} from "../api-services/wishlistApi";
import {
  toggleWatchlistRequest,
  fetchWatchlistRequest,
  fetchWatchlistSuccess,
  fetchWatchlistFailure,
} from "../Slices/watchlistSlice";

function* handleFetchWatchlist() {
  try {
    const data = yield call(fetchWatchlistApi);
    yield put(fetchWatchlistSuccess(data));
  } catch (error: any) {
    yield put(fetchWatchlistFailure(error.message));
  }
}

function* handleToggleWatchlist(action: any) {
  try {
    const updatedWatchlist = yield call(toggleWatchlistApi, action.payload);
    yield put(fetchWatchlistSuccess(updatedWatchlist));
  } catch (error: any) {
    yield put(fetchWatchlistFailure(error.message));
  }
}

export function* watchWatchlistSaga() {
  yield takeLatest(fetchWatchlistRequest.type, handleFetchWatchlist);
  yield takeLatest(toggleWatchlistRequest.type, handleToggleWatchlist);
}
