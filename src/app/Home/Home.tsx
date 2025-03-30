import MoviesList from "./MoviesList/MoviesList";
import useMovies from "@/@hooks/useMovies";
import classes from "./Home.module.scss";
import TopBar from "./TopBar/TopBar";
import Loader from "@/@components/Loader/Loader";
import useApi from "@/@hooks/useApi";
import { useEffect, useRef } from "react";
import { MovieService } from "@/@services/Movie/Movie.service";

const Home = () => {
  const fetchGenres = async () => {
    const data = await MovieService.getGenres();
    return data.genres;
  };

  const {
    data: genres,
    error: genresError,
    loading: genresLoading,
  } = useApi(fetchGenres);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    movies,
    currentPage,
    loading,
    loadingMore,
    error,
    query,
    setQuery,
    fetchMoreMovies,
    totalPages,
  } = useMovies();

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    if (!loadMoreElement) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          currentPage + 1 < totalPages.current
        ) {
          fetchMoreMovies();
        }
      },
      { rootMargin: "100px" }
    );

    intersectionObserver.observe(loadMoreElement);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [currentPage, loading, totalPages.current]);

  return (
    <div className={`${classes.home} d-flex justify-center`}>
      <TopBar query={query} setQuery={setQuery} />
      <div className={`${classes.homeCore} max-section`}>
        {(loading || genresLoading) && <Loader />}

        {error && <div>Error: {error.message}</div>}
        {movies.length > 0 && genres && (
          <div>
            <MoviesList movies={movies} genres={genres} />
            <div className={`${classes.observer}`} ref={loadMoreRef}></div>
            {loadingMore && <Loader />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
