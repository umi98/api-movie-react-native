import axios from 'axios';

const API_KEY = '305bdc887cbb2258112dc1d11034f30d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenres = async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: { api_key: API_KEY },
    });
    return response.data.genres;
}

export const fetchMovieByGenre = async (genreId, page = 1) => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: { api_key: API_KEY, with_genres: genreId, page},
    });
    return response.data;
}

export const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY }
    });
    return response.data;
}

export const fetchMovieReviews = async (movieId, page = 1) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        params: { api_key: API_KEY, page }
    });
    return response.data.results;
}

export const fetchMovieTrailer = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params: { api_key: API_KEY }
    });
    return response.data.results.find(video => video.type === 'Trailer');
}