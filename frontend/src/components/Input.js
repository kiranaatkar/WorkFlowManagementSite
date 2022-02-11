import React from "react";

class Input extends React.Component {
  handleBlur(e) {
    if (e.target.value) e.target.classList.add("blurred");
    else e.target.classList.remove("blurred");
  }

  render() {
    const { type, id, value } = this.props;
    const placeholder = this.props.placeholder ? this.props.placeholder : id;
    return (
      <label className="form-field">
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => this.props.change(e)}
          onBlur={(e) => this.handleBlur(e)}
        ></input>
        <span className="placeholder">{placeholder}</span>
      </label>
    );
  }
}

export default Input;
