import React from "react";
import Networking from "./Networking.js";
import { Navigate } from "react-router-dom";
import Input from "./Input";
import { Link } from "react-router-dom";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
      password: "",
      confirmation: "",
      valid: true,
      errorMsg: "",
    };
    this.Networking = new Networking();
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleBlur(e) {
    // Keep placeholder at top of input if user typed something
    if (e.target.value) e.target.classList.add("blurred");
    else e.target.classList.remove("blurred");
  }

  async onSubmit(e) {
    e.preventDefault();
    const { email, password, confirmation } = this.state;
    const { json, status } = await this.Networking.createAccount(
      email,
      password,
      confirmation
    );
    if (status === 200) {
      this.setState({ redirect: true });
    } else {
      this.setState({ valid: false, errorMsg: "ERROR: " + json.message });
    }
  }

  render() {
    const { email, password, confirmation, valid, errorMsg } = this.state;
    return (
      <div>
        {this.state.redirect ? (
          <Navigate to="/home" />
        ) : (
          <div className="form-wrapper">
            <h2>Create Account</h2>
            <form
              onSubmit={async (e) => await this.onSubmit(e)}
              className="post-form"
            >
              <Input
                change={(e) => this.handleChange(e)}
                id="email"
                value={email}
                type="email"
              />

              <Input
                change={(e) => this.handleChange(e)}
                id="password"
                value={password}
                type="password"
              />

              <Input
                change={(e) => this.handleChange(e)}
                id="confirmation"
                value={confirmation}
                type="password"
                placeholder="confirm password"
              />

              <button
                onClick={async (e) => await this.onSubmit(e)}
                className="form-btn submit"
              >
                Create Account
              </button>
              <h5>
                Already have an account?{" "}
                <Link to="/login" className="sign-up">
                  Log in
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

export default CreateAccount;
