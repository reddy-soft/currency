import { Component } from "react";

import "./index.css";
const data = localStorage.getItem("usr");
const parsedData = JSON.parse(data);

class ForgetPassword extends Component {
  state = { userName: "", error: false, setPassword: false, password: "" };

  onChangeUser = (event) => {
    this.setState({ userName: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value.trim() });
  };
  onClickPasswordSet = () => {
    const { password, userName } = this.state;
    const index = parsedData.findIndex(function (e) {
      return userName === e.user;
    });
    if (password === "") {
      alert("Please Fill Password");
    } else {
      parsedData[index].pass = password;
      localStorage.setItem("usr", JSON.stringify(parsedData));
      const { history } = this.props;
      history.push("/login");
    }
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { userName } = this.state;

    const filteredData = parsedData.filter((each) => {
      return each.user === userName;
    });
    console.log(filteredData);
    if (filteredData.length === 1) {
      this.setState({ error: false });
      this.setState({ setPassword: true });
    } else {
      this.setState({ error: true });
      this.setState({ setPassword: false });
    }
  };

  setPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <input
          type="password"
          value={password}
          className="login-input"
          onChange={this.onChangePassword}
          placeholder="ENTER PASSWORD"
        />
        <button className="forget-button" onClick={this.onClickPasswordSet}>
          Confirm
        </button>
      </>
    );
  };

  deleteBtn = () => {
    const { setPassword } = this.state;
    return setPassword ? "delete" : " ";
  };
  inputReadOnly = () => {
    const { setPassword } = this.state;
    return setPassword ? "readonly" : "";
  };

  render() {
    const { userName, error, setPassword } = this.state;
    return (
      <div className="forget-bg-cont">
        <div className="forget-Card">
          <img
            className="forget-image"
            src="https://media.wired.com/photos/5926e34f8d4ebc5ab806bd1c/master/pass/GettyImages-528338761.jpg"
            alt="forget"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="forget-form">
              <h1>Forget Password?</h1>
              <p>Enter the username associated with your account</p>
              {error && (
                <p className="err-msg forget-err">Username Not Found</p>
              )}
              <input
                className="login-input"
                type="text"
                placeholder="ENTER USERNAME"
                value={userName}
                onChange={this.onChangeUser}
                readOnly={this.inputReadOnly()}
              />
              <button className={`forget-button ${this.deleteBtn()}`}>
                Continue
              </button>
              {setPassword && this.setPasswordField()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
