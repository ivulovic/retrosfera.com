/*
 * GithubRepoForm Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { WISHLIST_SCOPE } from './constants';
import { WishlistsState, Wishlist } from './types';

// The initial state of the GithubRepoForm container
export const initialState: WishlistsState = {
  wishlists: [],
  otherUserWishlist: [],
  tempWish: null,
  loading: null,
  error: null,
};

const wishlistsSlice = createSlice({
  name: WISHLIST_SCOPE,
  initialState,
  reducers: {
    loadWishlists(state) {
      state.loading = state.loading == null ? true : false;
      state.error = null;
      state.wishlists = [];
    },
    loadWishlistsSuccess(state, action: PayloadAction<Wishlist[]>) {
      state.wishlists = action.payload;
      state.loading = false;
    },
    loadWishlistsFail(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    createWishlist(state, action: PayloadAction<Wishlist>) {
      state.loading = true;
      state.error = null;
    },
    createWishlistSuccess(state, action: PayloadAction<Wishlist>) {
      state.wishlists.unshift(action.payload);
      state.tempWish = null;
      state.loading = false;
    },
    // updateWishlist(state, action: PayloadAction<Wishlist>) {
    //   state.loading = true;
    //   state.error = null;
    // },
    // updateWishlistSuccess(state, action: PayloadAction<Wishlist>) {
    //   state.wishlists = state.wishlists.map(i =>
    //     i._id === action.payload._id ? { ...i, ...action.payload } : i,
    //   );
    //   state.loading = false;
    // },
    removeWishlist(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    removeWishlistSuccess(state, action: PayloadAction<Wishlist>) {
      state.wishlists = state.wishlists.filter(
        i => i._id !== action.payload._id,
      );
      state.loading = false;
    },
    fetchProductUrl(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    fetchedProductUrl(state, action: PayloadAction<any>) {
      state.tempWish = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchedProductUrlFailed(state) {
      state.loading = false;
    },

    loadOtherUserWishlist(state, action: PayloadAction<any>) {
      state.otherUserWishlist = [];
      state.loading = true;
      state.error = null;
    },
    loadOtherUserWishlistSuccess(state, action: PayloadAction<Wishlist[]>) {
      state.otherUserWishlist = action.payload;
      state.loading = false;
    },
    loadOtherUserWishlistFail(state /**, action: PayloadAction<any> */) {
      state.loading = false;
    },
    clearWishlistPageState(state) {
      return initialState;
    },
  },
});

export const { actions, reducer, name: sliceKey } = wishlistsSlice;
