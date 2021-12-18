import PropTypes from "prop-types";

const ListGroup = (props) => {
  const { items, currentGenre, onItemSelect, textProperty, valueProperty } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={
            (currentGenre === item
              ? "list-group-item active"
              : "list-group-item") + " clickable"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  currentGenre: PropTypes.oneOfType([PropTypes.oneOf([""]), PropTypes.object]),
  onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
