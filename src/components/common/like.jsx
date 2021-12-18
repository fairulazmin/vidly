import PropTypes from "prop-types";

const Like = (props) => {
  const { liked, item, onLiked } = props;

  return (
    <i
      className={(liked ? "fa fa-heart" : "fa fa-heart-o") + " clickable"}
      onClick={() => onLiked(item._id)}
    ></i>
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
};

export default Like;
