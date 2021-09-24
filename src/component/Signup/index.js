import { Component } from "react";
import "./index.css";

let localData = localStorage.getItem("usr");
let parsed = JSON.parse(localData);

class Signup extends Component {
  state = {
    username: "",
    password: "",
    rePassword: "",
    errorUser: false,
    errorPass: false,
    checkValue: false,
    errorChk: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value.trim() });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value.trim() });
  };
  onChangeRePassword = (event) => {
    this.setState({ rePassword: event.target.value.trim() });
  };
  onClickChk = (event) => {
    this.setState({ checkValue: event.target.checked });
  };
  onSubmitForm = (event) => {
    const { username, password, rePassword, checkValue } = this.state;

    event.preventDefault();
    const result = parsed.filter((each) => {
      return each.user === username;
    });
    if (checkValue === false) {
      this.setState({ errorChk: true });
      this.setState({ errorPass: false });
      this.setState({ errorUser: false });
    } else if (result.length > 0 || username === "") {
      this.setState({ errorUser: true });
      this.setState({ errorPass: false });
      this.setState({ errorChk: false });
    } else if (
      password !== rePassword ||
      password === "" ||
      rePassword === ""
    ) {
      this.setState({ errorPass: true });
      this.setState({ errorChk: false });
      this.setState({ errorUser: false });
    } else {
      const data = {
        user: username,
        pass: password,
      };

      parsed.push(data);
      localStorage.setItem("usr", JSON.stringify(parsed));

      const { history } = this.props;

      history.replace("/");
    }
  };

  onClickSignIn = () => {
    const { history } = this.props;

    history.replace("/login");
  };

  render() {
    const {
      username,
      password,
      rePassword,
      checkValue,
      errorChk,
      errorUser,
      errorPass,
    } = this.state;

    return (
      <div className="signup-bg-container">
        <form className="signup-container" onSubmit={this.onSubmitForm}>
          {errorChk && <p className="err-msg">Please Agree Terms</p>}
          {errorPass && (
            <p className="err-msg">Password Empty or Do not match</p>
          )}
          {errorUser && (
            <p className="err-msg">User Already Exits or Input Empty </p>
          )}
          <h1 className="signup-heading">Set up your Account.</h1>

          <input
            type="text"
            className="signup-input"
            placeholder="TYPE YOUR USERNAME"
            value={username}
            onChange={this.onChangeUsername}
          />
          <br />
          <input
            type="password"
            className="signup-input"
            placeholder="TYPE YOUR PASSWORD"
            value={password}
            onChange={this.onChangePassword}
          />
          <br />
          <input
            type="password"
            className="signup-input"
            placeholder="RETYPE YOUR PASSWORD"
            value={rePassword}
            onChange={this.onChangeRePassword}
          />
          <div className="signup-terms">
            <input
              type="checkbox"
              id="chk"
              onChange={this.onClickChk}
              value={checkValue}
            />
            <label htmlFor="chk">I agree with Terms </label>
          </div>
          <button className="login-button">Sign Up</button>
          <p>
            Already have an account?
            <span onClick={this.onClickSignIn} className="login-signUp">
              Sign in
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;
