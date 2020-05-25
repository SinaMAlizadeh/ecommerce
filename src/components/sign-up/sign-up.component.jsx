import React, { Component } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomeButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../redux/user/user.action";
import "./sign-up.styles.scss";

class SignUp extends Component {
  state = {
    displayName: "",
    password: "",
    email: "",
    confirmPassword: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert(`password don't match`);
      return;
    }

    signUpStart({email , password ,displayName});

  };

  handleChange = (event) => {
    debugger;
    const { value, name } = event.target;

    // this.setState({ [name]: value });
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            lable="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            lable="Email"
            handleChange
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            lable="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            lable="Confirm Password"
            required
          />
          <CustomeButton type="submit"> SIGN UP </CustomeButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispacth) => ({
  signUpStart: (userCredentials) => dispacth(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
