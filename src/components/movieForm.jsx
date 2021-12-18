import React from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieServices";
import Form from "./common/form";

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  getSchema = (type) => {
    const Joi = require("joi");
    const schema = {
      _id: Joi.string(),
      title: Joi.string().trim().label("Title").required(),
      genreId: Joi.string().label("Genre").required(),
      numberInStock: Joi.number()
        .min(0)
        .max(100)
        .label("Number in Stock")
        .required(),
      dailyRentalRate: Joi.number()
        .min(0)
        .max(10)
        .label("Daily Rental Rate")
        .required(),
    };

    return type === undefined
      ? Joi.object(schema)
      : Joi.object({ [type]: schema[type] });
  };

  componentDidMount() {
    // const genres = getGenres().map((genre) => genre.name);
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("save")}
        </form>
      </React.Fragment>
    );
  }
}

export default NewMovieForm;
