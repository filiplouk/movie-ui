import { useEffect, useState, useRef, RefObject, useCallback } from "react";
import { MovieService } from "@/@services/Movie/Movie.service";
import type { Movie } from "@/@services/Movie/Movie.entity";
import { debounce } from "lodash";

type UseMoviesReturn = {
  movies: Movie[];
  currentPage: number;
  loading: boolean;
  loadingMore: boolean;
  error: Error | undefined;
  query: string;
  setQuery: (query: string) => void;
  fetchMovies: () => Promise<void>;
  fetchMoreMovies: () => Promise<void>;
  totalPages: RefObject<number>;
};

const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [query, setQuery] = useState<string>("");

  const totalPages = useRef(0);

  const fetchMovies = async () => {
    setLoading(true);
    setCurrentPage(1);
    setMovies([]);

    try {
      const data = query
        ? await MovieService.searchPage(1, query)
        : await MovieService.searchActivePage(1);

      setMovies(data.results);
      totalPages.current = data.total_pages;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreMovies = async () => {
    if (loading || currentPage >= totalPages.current) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const data = query
        ? await MovieService.searchPage(nextPage, query)
        : await MovieService.searchActivePage(nextPage);

      setMovies((prev) => [...prev, ...data.results]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoadingMore(false);
    }
  };

  const debouncedFetchMovies = useCallback(
    debounce(() => {
      fetchMovies();
    }, 300),
    [query]
  );

  useEffect(() => {
    !query ? fetchMovies() : debouncedFetchMovies();

    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [query]);

  return {
    movies,
    currentPage,
    loading,
    loadingMore,
    error,
    query,
    setQuery,
    fetchMovies,
    fetchMoreMovies,
    totalPages,
  };
};

export default useMovies;
