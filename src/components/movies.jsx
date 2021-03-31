import React, { Component } from 'react';
import Like from './common/like';
import Pagination from './common/Pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4
    };
  }

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = ({ target }) => {
    const targetTitle = target.name;
    const moviesList = this.state.movies;
    const updatedMovies = moviesList.filter(
      movie => movie.title !== targetTitle
    );
    this.setState({ movies: updatedMovies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelect = genre => {
    console.log(genre);
  };

  formatCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return this.state.movies.length === 0 ? (
      <p>There are no movies in the database</p>
    ) : (
      <div className="row m-3">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            textProperty="name"
            valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p className="ml-3">
            Showing {allMovies.length} movies in the database
          </p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => {
                return (
                  <tr key={movie._id}>
                    <th scope="row">{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        name={movie.title}
                        onClick={this.handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <br></br>
      </div>
    );
  }
}

export default Movies;
