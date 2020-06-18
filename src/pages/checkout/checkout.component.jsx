import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  CheckoutPageContainer,
  CheckoutPageHeader,
  CheckoutPageHeaderBlock,
  CheckoutPageTotal,
  CheckoutPageTestCard,
  CheckoutPageStripeCheckoutButton,
} from "./checkout.styles";

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutPageHeader>
      <CheckoutPageHeaderBlock>
        <span>Product</span>
      </CheckoutPageHeaderBlock>
      <CheckoutPageHeaderBlock>
        <span>Description</span>
      </CheckoutPageHeaderBlock>
      <CheckoutPageHeaderBlock>
        <span>Quantity</span>
      </CheckoutPageHeaderBlock>
      <CheckoutPageHeaderBlock>
        <span>Price</span>
      </CheckoutPageHeaderBlock>
      <CheckoutPageHeaderBlock>
        <span>Remove</span>
      </CheckoutPageHeaderBlock>
    </CheckoutPageHeader>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <CheckoutPageTotal>TOTAL: ${total}</CheckoutPageTotal>
    <CheckoutPageTestCard>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: *any date in the future* - CVV: *any 3 digit
      number*
    </CheckoutPageTestCard>
    <CheckoutPageStripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
