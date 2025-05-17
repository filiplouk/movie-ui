import MovieCard from "./MovieCard/MovieCard";
import type { Movie } from "@/@services/Movie/Movie.entity";
import classes from "./MoviesList.module.scss";
import { Genre } from "@/@services/Movie/@dtos/Genre.dto";

type MoviesListProps = {
  movies: Partial<Movie>[];
  genres: Genre[];
};

const MoviesList = ({ movies, genres }: MoviesListProps) => {
  return (
    <div id="movies-list" className={`${classes.moviesList} d-flex`}>
      {movies.map((movie, index) => {
        return (
          <div className={`${classes.movie} d-flex flex-column`} key={movie.id}>
            <MovieCard movie={movie} genres={genres} />
          </div>
        );
      })}
    </div>
  );
};

export default MoviesList;
