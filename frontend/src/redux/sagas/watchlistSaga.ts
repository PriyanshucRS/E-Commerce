import { put, call, takeLatest } from "redux-saga/effects";
import {
  toggleWatchlistApi,
  fetchWatchlistApi,
} from "../api-services/wishlistApi";
import {
  toggleWatchlistRequest,
  toggleWatchlistSuccess,
  toggleWatchlistFailure,
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
    const payload = action.payload;
    const productId =
      payload?.productId || payload?._id || payload?.id || payload;
    const updatedWatchlist = yield call(toggleWatchlistApi, productId);
    yield put(toggleWatchlistSuccess(updatedWatchlist));
  } catch (error: any) {
    yield put(toggleWatchlistFailure(error.message));
  }
}

export function* watchWatchlistSaga() {
  yield takeLatest(fetchWatchlistRequest.type, handleFetchWatchlist);
  yield takeLatest(toggleWatchlistRequest.type, handleToggleWatchlist);
}
