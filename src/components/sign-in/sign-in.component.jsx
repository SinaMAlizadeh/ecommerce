import React, { Component } from "react";
import "./sign-in.styles.scss";
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefaulf();
    this.setState({ email: "", password: "" });
  };

  handleChange = event => {

    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
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
            lable='Email'
            required
          />
          <FormInput
            name="password"
            handleChange={this.handleChange}
            type="password"
            lable='password'
            value={this.state.password}
          />        
          <CustomButton
           type="submit" 
          >
            SIGN IN
             </CustomButton>
        </form>
      </div>
    );
  }
}
export default SignIn;
