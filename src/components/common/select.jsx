const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select {...rest} id={name} className="form-select">
        <option value="" />
        {options.map((option, id) => (
          <option key={id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="form-text">{error}</div>}
    </div>
  );
};

export default Select;
