import Modal from "@/@components/Modal/Modal";
import { MovieService } from "@/@services/Movie/Movie.service";
import Loader from "@/@components/Loader/Loader";
import useApi from "@/@hooks/useApi";
import classes from "./MovieDialog.module.scss";
import { useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Genre } from "@/@services/Movie/@dtos/Genre.dto";
import { Movie } from "@/@services/Movie/Movie.entity";
import { Review } from "@/@services/Movie/@dtos/Review.dto";

type MovieDialogProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: number | undefined;
  genres: Genre[];
};

const MovieDialog = ({ open, setOpen, id, genres }: MovieDialogProps) => {
  const fetchVideos = async () => {
    const data = await MovieService.movieTrailer(id);
    return data.results;
  };
  const fetchReviews = async () => {
    const data = await MovieService.movieReviews(id);
    return data.results;
  };
  const fetchSimilarMovies = async () => {
    const data = await MovieService.movieSimilar(id);
    return data.results;
  };

  const fetchAll = () => {
    return Promise.all([fetchVideos(), fetchReviews(), fetchSimilarMovies()]);
  };

  const { data, loading, error } = useApi(fetchAll, open);

  const [videos, reviews, similarMovies] = data || [[], [], []];

  return (
    <>
      <Modal open={open} setOpen={setOpen} width="70rem">
        {loading && <Loader />}
        {error && (
          <p className="font-error">Something went wrong, please try later.</p>
        )}
        {data && (
          <>
            <div
              className={`${classes.movieDetails} d-flex flex-column flex-grow-1`}
            >
              <div className={`${classes.detailsBlock}`}>
                <h3 className={`${classes.title}`}>Reviews</h3>
                <div className={`${classes.reviews} d-flex flex-column`}>
                  {reviews?.length ? (
                    reviews.slice(0, 2).map((review: Review, index: number) => {
                      return (
                        <div className={`${classes.review}`} key={review.id}>
                          <p className={`${classes.author} text-16`}>
                            {review.author}
                          </p>
                          <p className="text-14 font-purple">
                            "{review.content}"
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p>No reviews found.</p>
                  )}
                </div>
              </div>
              <div className={`${classes.detailsBlock}`}>
                <h3 className={`${classes.title}`}>Similar Movies</h3>
                <div className={`${classes.similarMovies} d-flex`}>
                  {similarMovies?.length ? (
                    similarMovies
                      .slice(0, 5)
                      .map((movie: Movie, index: number) => {
                        return (
                          <div className={`${classes.movie}`} key={movie.id}>
                            <MovieCard embedded movie={movie} genres={genres} />
                          </div>
                        );
                      })
                  ) : (
                    <p>No similar movies.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default MovieDialog;
