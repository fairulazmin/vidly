import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = (itemsCount + pageSize - 1) / pageSize;
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  if (pages.length <= 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={
              (currentPage === page ? "page-item active" : "page-item") +
              " clickable"
            }
            key={page}
          >
            <span className="page-link" onClick={onPageChange} data-page={page}>
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
