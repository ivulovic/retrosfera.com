import { call, put, takeLatest, delay } from 'redux-saga/effects';

import { request, makePostReq, makeDeleteReq } from 'utils/request';
import { actions } from './slice';
import { Wishlist } from './types';

/**
 * Github repos request/response handler
 */
export function* getWishlists() {
  const requestURL = `/api/wishlists`;
  try {
    const wishlists: Wishlist[] = yield call(request, requestURL);
    yield put(actions.loadWishlistsSuccess(wishlists));
  } catch (err) {
    yield put(actions.fetchedProductUrlFailed());
    if (err.response?.status === 404) {
      // yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      // yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      // yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

export function* createWishlist(action) {
  const requestURL = `/api/wishlists`;
  const { errorCount, message, store, ...payload } = action.payload;
  console.log('iv: creating', payload);
  try {
    const wish: Wishlist = yield call(
      request,
      requestURL,
      makePostReq(payload) as RequestInit,
    );
    if (wish) {
      yield put(actions.createWishlistSuccess(wish));
    } else {
      console.log('Error occured ');
      // yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    console.log('Error occured ', err);
    if (err.response?.status === 404) {
      // yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      // yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      // yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

// export function* updateWishlist(action) {
//   yield delay(500);
//   const {
//     _id,
//     createdAt,
//     modifiedAt,
//     __v,
//     createdBy,
//     modifiedBy,
//     ...payload
//   } = action.payload;
//   const requestURL = `/api/wishlists/${_id}`;
//   try {
//     const Wishlist: Wishlist = yield call(
//       request,
//       requestURL,
//       makePatchReq(payload) as RequestInit,
//     );
//     if (Wishlist) {
//       yield put(actions.updateWishlistSuccess(Wishlist));
//     } else {
//       console.log('Error occured ');
//       // yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
//     }
//   } catch (err) {
//     console.log('Error occured ', err);
//     if (err.response?.status === 404) {
//       // yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
//     } else if (err.message === 'Failed to fetch') {
//       // yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
//     } else {
//       // yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
//     }
//   }
// }

export function* removeWishlist(action) {
  const requestURL = `/api/wishlists/${action.payload}`;
  try {
    const wish: Wishlist = yield call(
      request,
      requestURL,
      makeDeleteReq({}) as RequestInit,
    );
    if (wish) {
      yield put(actions.removeWishlistSuccess(wish));
    } else {
      console.log('Error occured ');
      // yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    console.log('Error occured ', err);
    if (err.response?.status === 404) {
      // yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      // yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      // yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

export function* fetchProduct(action) {
  const requestURL = `/api/wishlists/fetch`;
  try {
    const wish: Wishlist = yield call(
      request,
      requestURL,
      makePostReq(action.payload) as RequestInit,
    );
    if (wish) {
      yield put(actions.createWishlist(wish));
    } else {
      console.log('Error occured ');
      // yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    yield put(actions.fetchedProductUrlFailed());
    console.log('Error occured ', err);
    if (err.response?.status === 404) {
      // yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      // yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      // yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

export function* getOtherUserWishlist(action) {
  const requestURL = `/api/wishlists/user`;

  try {
    const wishlists: Wishlist[] = yield call(
      request,
      requestURL,
      makePostReq(action.payload) as RequestInit,
    );
    yield put(actions.loadOtherUserWishlistSuccess(wishlists));
  } catch (err) {
    yield put(actions.loadOtherUserWishlistFail());
    if (err.response?.status === 404) {
      // yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      // yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      // yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* wishlistsSaga() {
  yield takeLatest(actions.loadWishlists.type, getWishlists);
  yield takeLatest(actions.createWishlist.type, createWishlist);
  yield takeLatest(actions.removeWishlist.type, removeWishlist);
  yield takeLatest(actions.fetchProductUrl.type, fetchProduct);
  yield takeLatest(actions.loadOtherUserWishlist.type, getOtherUserWishlist);
}
