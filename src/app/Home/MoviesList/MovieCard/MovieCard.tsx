import { useState } from "react";
import { Movie } from "@/@services/Movie/Movie.entity";
import classes from "./MovieCard.module.scss";
import placeholder from "@/@assets/images/placeholder.jpg";
import Badge from "@/@components/Badge/Badge";
import { Genre } from "@/@services/Movie/@dtos/Genre.dto";
import MovieDialog from "../MovieDialog/MovieDialog";

type MovieCardProps = {
  movie: Partial<Movie>;
  genres: Genre[];
  embedded?: boolean;
};

const MovieCard = ({ movie, genres, embedded = false }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const image_url = import.meta.env.VITE_IMAGE_URL;
  const movieImg = movie.poster_path
    ? `${image_url}/${movie.poster_path}`
    : placeholder;

  const movieGenres = genres.filter((genre) => {
    return movie.genre_ids ? movie.genre_ids.includes(genre.id) : false;
  });

  const movieRating = movie.vote_average
    ? Number(movie.vote_average.toFixed(1))
    : -1;

  const ratingColor =
    movieRating > 8
      ? "font-success"
      : movieRating > 5
      ? "font-info"
      : "font-error";

  return (
    <>
      <a
        type="button"
        className={`${classes.movieCard} ${
          embedded && classes.embedded
        } d-flex flex-column`}
        onClick={() => setShowModal(true)}
      >
        <img
          className={`${classes.cardImage} w-100 h-100`}
          src={movieImg}
          alt={movie.original_title}
        />
        <div className={`${classes.cardDetails} d-flex flex-column w-100`}>
          <h3 className={`${classes.title} text-20 font-white`}>
            {movie.title}
          </h3>

          <div className={`${classes.basic} text-14 d-flex`}>
            <span className="font-yellow">{movie.release_date}</span>
            <span className="font-white">/</span>
            <span className={`${ratingColor}`}>
              {movieRating > 0 ? movieRating : "-"}
            </span>
          </div>

          <div className={`${classes.genres} text-14 font-purple d-flex`}>
            {movieGenres.map((genre, index) => {
              return (
                <>
                  <Badge key={index}>{genre.name}</Badge>
                </>
              );
            })}
          </div>

          <p className={`${classes.overview} text-16`}>{movie.overview}</p>
        </div>
      </a>
      {!embedded && (
        <MovieDialog
          open={showModal}
          setOpen={setShowModal}
          id={movie.id}
          genres={genres}
        />
      )}
    </>
  );
};

export default MovieCard;
