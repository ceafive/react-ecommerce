import React from "react";
import moduleName from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import moduleName from "../with-spinner/with-spinner.component";
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});
