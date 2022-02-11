import React from "react";
import Networking from "./Networking.js";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Input from "./Input";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
      password: "",
      valid: true,
      errorMsg: "",
    };
    this.Networking = new Networking();
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleBlur(e) {
    if (e.target.value) e.target.classList.add("blurred");
    else e.target.classList.remove("blurred");
  }

  async onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const response = await this.Networking.login(email, password);
    if (response.status === 200) {
      // display home page once logged in
      this.setState({ redirect: true });
    } else {
      this.setState({ valid: false, errorMsg: "ERROR: " + response.json.msg });
    }
  }

  render() {
    const { email, password, valid, errorMsg } = this.state;
    return (
      <div>
        {this.state.redirect ? (
          <Navigate to="/home" />
        ) : (
          <div className="form-wrapper">
            <h2>Log in</h2>
            <form
              onSubmit={async (e) => await this.onSubmit(e)}
              className="post-form"
            >
              <Input
                change={(e) => this.handleChange(e)}
                id="email"
                value={email}
                type="text"
              />
              <Input
                change={(e) => this.handleChange(e)}
                id="password"
                value={password}
                type="password"
              />
              <button
                onClick={async (e) => await this.onSubmit(e)}
                className="form-btn submit"
              >
                Log in
              </button>
              <h5>
                Don't have an account?{" "}
                <Link to="/createAccount" className="sign-up">
                  {" "}
                  Sign up
                </Link>
              </h5>
              <h3 className="error-msg">{!valid ? errorMsg : ""}</h3>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default LoginPage;
