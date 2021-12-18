import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/fakeMovieServices";
import { getGenres } from "../../src/services/fakeGenreService";
import ListGroup from "./listGroup";
import MoviesTables from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" },
    search: "",
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
    });
  }

  handleDelete = (_id) => {
    let movies = [...this.state.movies];
    movies = movies.filter((movie) => movie._id !== _id);
    this.setState({ movies });
  };

  handleLiked = (_id) => {
    const movies = [...this.state.movies];
    movies.map((movie) => {
      if (movie._id === _id) {
        movie.liked = !movie.liked;
      }
      return movie;
    });

    this.setState({
      movies,
    });
  };

  handlePageChange = (event) => {
    const page = parseInt(event.target.dataset.page);
    this.setState({
      currentPage: page,
    });
  };

  handleGenreSelect = (item) => {
    this.setState({ currentGenre: item, currentPage: 1, search: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleNewMovieForm = (data) => {
    this.setState({ movies: { ...this.state.movies, data } });
  };

  handleChange = ({ target: name }) => {
    this.setState({ [name.id]: name.value, currentGenre: "" });
  };
  sortMovies = (filtered) => {
    const { path, order } = this.state.sortColumn;
    const sorteredMovies = _.orderBy(filtered, [path], [order]);
    return sorteredMovies;
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      currentGenre,
      search,
    } = this.state;

    // Filter movies by genre
    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((movie) => movie.genre._id === currentGenre._id)
        : search
        ? allMovies.filter((movie) =>
            movie.title.toLowerCase().includes(search)
          )
        : allMovies;

    // Sort movies
    const sorteredMovies = this.sortMovies(filtered);

    // Paginate movies
    const firstIndex = (currentPage - 1) * pageSize;
    const secondIndex = currentPage * pageSize;
    const movies = sorteredMovies.slice(firstIndex, secondIndex);
    return { movies, length: filtered.length, pageSize };
  };

  render() {
    const { length: total } = this.state.movies;
    if (total === 0) return <p>There are no movies in the database</p>;

    const { movies, length, pageSize } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              currentGenre={this.state.currentGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>
            <p>Showing {length} movies in the database</p>
            <SearchBox value={this.state.search} onChange={this.handleChange} />
            <MoviesTables
              movies={movies}
              onLiked={this.handleLiked}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              itemsCount={length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
