const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        id={name}
        className="form-control"
        autoFocus={name === "username" ? true : false}
      />
      {error || <div className="form-text">{error}</div>}
    </div>
  );
};

export default Input;
