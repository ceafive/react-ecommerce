import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signUpInSuccess,
  signUpInOutFailure,
  signOutSuccess,
} from "./user.action";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../utils/firebase.utils";

// GLOBAL GENERATOR USED DOWN BELOW
function* getSnapshotFromUserAuth(userAuth) {
  const userRef = yield call(createUserProfileDocument, userAuth);
  const userSnapshot = yield userRef.get();
  yield put(signUpInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
}

// CHECK USER SESSION
function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signUpInOutFailure(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// GOOGLE SIGN IN
function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signUpInOutFailure(error));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// EMAIL SIGN IN
function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signUpInOutFailure(error));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// EMAIL SIGN UP
function* signUpWithEmail({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield call(getSnapshotFromUserAuth, { ...user, displayName });
  } catch (error) {
    yield put(signUpInOutFailure(error));
  }
}
function* onEmailSignUpStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START, signUpWithEmail);
}

// SIGN OUT
function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signUpInOutFailure(error));
  }
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onSignOutStart),
  ]);
}
