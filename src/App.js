import React, { Component } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Checkout from "./pages/checkout/chekhout.component";
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.action";


class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      debugger;
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser({ userAuth });
      //this.setState({currentUser : user})
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInSignUp />
            }
          />
          <Route exact path="/checkout" component={Checkout} />

        </Switch>
      </div>
    );
  }
}

const mapToStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapToStateToProps, mapDispatchToProps)(App);
