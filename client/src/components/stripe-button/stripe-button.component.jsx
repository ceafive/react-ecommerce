import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_4D7WIfqq195bXUvAiQ6GsZNr008NJl1orP";

  const onToken = async (token) => {
    try {
      const res = await axios.post("/payment", {
        amount: priceForStripe,
        token,
      });
      const data = await res.data;
      console.log(data);
      alert("Payment Successful");
    } catch (error) {
      console.error(error);
      alert("Payment Unsuccessful, Changed Card");
    }
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Tribe Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
