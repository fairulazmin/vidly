import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      content: (movie) => (
        <Like liked={movie.liked} item={movie} onLiked={this.props.onLiked} />
      ),
    },
    {
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          <i className="fa fa-trash" />
        </button>
      ),
    },
  ];

  render() {
    const { movies, onLiked, onDelete, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        onLiked={onLiked}
        onDelete={onDelete}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
