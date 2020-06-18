import { takeLatest, all, put, call } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onClearCart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onClearCart)]);
}
