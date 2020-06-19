import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

import {
  CollectionPageContainer,
  CollectionPageTitle,
  CollectionPageItems,
  CollectionPageItem,
} from "./collection.styles";

const CollectionPage = ({ collection: { title, items } }) => {
  return (
    <CollectionPageContainer>
      <CollectionPageTitle>{title}</CollectionPageTitle>
      <CollectionPageItems>
        {items.map((item) => (
          <CollectionPageItem key={item.id} item={item} />
        ))}
      </CollectionPageItems>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
