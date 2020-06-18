import UserActionTypes from "./user.types";

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const emailSignUpStart = (displayNameAndEmailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_UP_START,
  payload: displayNameAndEmailAndPassword,
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signUpInSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_IN_SUCCESS,
  payload: user,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signUpInOutFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_IN_OUT_FAILURE,
  payload: error,
});
