import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from '../../redux/user/user.action';
import { HeaderComponentContainer , 
  LogoComponentContainer , 
  OptionsComponentContainer , 
  OptionLink 
   } from './header.styles';
const Header = ({ currentUser, hidden ,signOutStart}) => {
  return (
    <HeaderComponentContainer>
      <LogoComponentContainer to="/" >
        <Logo className="logo" />
      </LogoComponentContainer>
      <OptionsComponentContainer>
        <OptionLink  to="/shop">
          SHOP
        </OptionLink>
        <OptionLink to="/shop">
          CONTACT
        </OptionLink>

        {currentUser ? (
          <OptionLink as='div' onClick={signOutStart}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
      </OptionsComponentContainer>
      {hidden ? null : <CartDropDown />}
    </HeaderComponentContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
    signOutStart : () => dispatch(signOutStart())
})

export default connect(mapStateToProps ,mapDispatchToProps)(Header);
