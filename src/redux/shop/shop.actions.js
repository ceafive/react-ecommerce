import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapShotToMap,
} from "../../utils/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => (dispatch) => {
  const collectionRef = firestore.collection("collections");
  dispatch(fetchCollectionsStart());

  collectionRef
    .get()
    .then((snapshot) => {
      const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    })
    .catch((err) => dispatch(fetchCollectionsFailure(err.message)));
};
