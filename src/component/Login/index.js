import { Component } from "react";
import "./index.css";

const parse = JSON.parse(localStorage.getItem("usr"));

if (parse === null) {
  const data = [
    {
      user: "subhash",
      pass: "1234",
    },
  ];
  localStorage.setItem("usr", JSON.stringify(data));
}

class Login extends Component {
  state = { userName: "", password: "", error: false };

  submitForm = (event) => {
    event.preventDefault();
    const { userName, password } = this.state;
    const parsed = JSON.parse(localStorage.getItem("usr"));
    for (let x of parsed) {
      const { history } = this.props;
      if (x.user === userName) {
        if (x.pass === password) {
          localStorage.setItem("login", "yes");
          this.setState({ error: false });
          history.replace("/");
        } else {
          this.setState({ error: true });
        }
      } else {
        this.setState({ error: true });
      }
    }
  };

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onclickSignUp = () => {
    const { history } = this.props;
    history.push("/signUp");
  };
  onclickForget = () => {
    const { history } = this.props;
    history.push("/forgetPass");
  };
  render() {
    const { userName, password, error } = this.state;
    console.log(userName, password);
    return (
      <div className="login-bg-cont">
        <h1 className="currency-heading-color">Currency Converter</h1>
        <form className="login-container" onSubmit={this.submitForm}>
          <h1>Log In To Your Account</h1>
          <input
            type="text"
            className="login-input"
            placeholder="TYPE YOUR USERNAME"
            value={userName}
            onChange={this.onChangeUserName}
          />
          <br />
          <input
            type="password"
            className="login-input"
            placeholder="TYPE YOUR PASSWORD"
            value={password}
            onChange={this.onChangePassword}
          />
          <br />
          <p className="login-forget" onClick={this.onclickForget}>
            Forget Password?
          </p>
          <button className="login-button">Log In</button>
          <p>
            Need an account
            <span className="login-signUp" onClick={this.onclickSignUp}>
              Sign up
            </span>
          </p>
          {error && <p className="err-msg">Invalid Username or Password </p>}
        </form>
      </div>
    );
  }
}
export default Login;
