import { Component } from "react";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
  };

  validate = () => {
    const schema = this.getSchema();
    const option = { abortEarly: false };
    const { error } = schema.validate(this.state.data, option);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ id: name, value }) => {
    const obj = { [name]: value };
    let schema = this.getSchema(name);
    const { error } = schema.validate(obj);
    return error ? error.message : null;
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    errorMessage ? (errors[input.id] = errorMessage) : delete errors[input.id];

    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    console.log("render select: ", data[name]);
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      />
    );
  };

  renderButton = (label) => (
    <button className="btn btn-primary" disabled={this.validate()}>
      {label}
    </button>
  );
}

export default Form;
