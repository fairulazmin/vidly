import React from "react";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  getSchema = (type) => {
    const Joi = require("joi");
    const schema = {
      username: Joi.string().trim().min(6).max(20).label("Username").required(),
      password: Joi.string().trim().min(6).label("Password").required(),
    };
    return type === undefined
      ? Joi.object(schema)
      : Joi.object({ [type]: schema[type] });
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginForm;
