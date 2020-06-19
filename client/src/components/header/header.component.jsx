import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.action";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionNavLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionNavLink to="/shop">SHOP</OptionNavLink>
      <OptionNavLink to="/contact">CONTACT</OptionNavLink>
      {currentUser ? (
        <OptionNavLink as="div" onClick={() => signOutStart()}>
          SIGN OUT
        </OptionNavLink>
      ) : (
        <OptionNavLink to="/signin">SIGN IN</OptionNavLink>
      )}
      <CartIcon />
      <div>{hidden ? null : <CartDropdown />}</div>
    </OptionsContainer>
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
