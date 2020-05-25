import React, { Component } from "react";
import "./sign-in.styles.scss";
import {connect} from 'react-redux';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {googleSignInStart , emailSignInStart} from '../../redux/user/user.action';

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async event => {
    debugger;
    event.preventDefault();
    const {emailSignInStart} = this.props;
    const { email, password } = this.state;
   emailSignInStart(email , password)
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } =this.props;
    return (
      <div className="sign-in">
        <h2>I already have an acount</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            lable="Email"
            required
          />
          <FormInput
            name="password"
            handleChange={this.handleChange}
            type="password"
            lable="password"
            value={this.state.password}
          />
          <div className="buttons">
            <CustomButton type="submit">SIGN IN</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
              SIGN IN WITH GOOGLE
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => ({
  googleSignInStart : () => dispatch(googleSignInStart()),
  emailSignInStart : (email , password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null ,mapDispatchToProp)(SignIn);
