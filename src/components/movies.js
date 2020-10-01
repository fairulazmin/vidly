import React, { Fragment } from 'react'
import Mov from './mov'
import { getMovies } from '../services/fakeMovieService'

class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }

  handleDelete = (id) => {
    this.setState({
      movies: this.state.movies.filter(movie => movie._id !== id)
    })
  }

  componentDidMount() {
    this.setState({ movies: getMovies() })
  }

  render() {
    if (this.state.movies.length === 0) {
      return 'There are no movies in database'
    }

    return (
      <Fragment>
        <p>Showing {this.state.movies.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) =>
              <Mov movie={movie} key={movie._id} onDelete={this.handleDelete} />)}
          </tbody>
        </table>
      </Fragment>
    )

  }
}

export default Movies