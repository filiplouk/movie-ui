import axiosInstance from "@/@libs/Axios/Axios";
import {
  movies_playing,
  movies_search,
  movies_genre,
} from "@/@config/urls.config";
import type { MoviesPlaying } from "./@dtos/MoviesPlaying.dto";
import type { Genre, GenreResponse } from "./@dtos/Genre.dto";
import { VideoResponse } from "./@dtos/Video.dto";
import { ReviewResponse } from "./@dtos/Review.dto";
import { Movie } from "./Movie.entity";

export class MovieService {
  static async searchActivePage(page: number): Promise<MoviesPlaying> {
    const result = await axiosInstance.get(`${movies_playing}`, {
      params: {
        page: page,
      },
    });

    return result.data;
  }

  static async searchPage(page: number, query: string): Promise<MoviesPlaying> {
    const result = await axiosInstance.get(`${movies_search}`, {
      params: {
        page: page,
        query: query,
      },
    });

    return result.data;
  }

  static async getGenres(): Promise<GenreResponse> {
    const result = await axiosInstance.get(`${movies_genre}`);

    return result.data;
  }

  static async movieTrailer(id: number | undefined): Promise<VideoResponse> {
    const result = await axiosInstance.get(`/movie/${id}/videos`);
    return result.data;
  }

  static async movieReviews(id: number | undefined): Promise<ReviewResponse> {
    const result = await axiosInstance.get(`/movie/${id}/reviews`);
    return result.data;
  }

  static async movieSimilar(
    id: number | undefined
  ): Promise<Partial<MoviesPlaying>> {
    const result = await axiosInstance.get(`/movie/${id}/similar`);
    return result.data;
  }
}
