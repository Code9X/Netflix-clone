using Microsoft.AspNetCore.Mvc.RazorPages;
using netflix_backend.Models.Response;
using netflix_backend.Repository;

namespace netflix_backend.Services.impl
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }
        public Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? fromDate, string? toDate, int? page)
        {
            return _movieRepository.GetMovieListAsync(title, type, fromDate, toDate, page);
        }

        public Task<MovieListResponse> GetTVListAsync(string? title, string? type, string? fromDate, string? toDate, int? page)
        {
            return _movieRepository.GetTVListAsync(title, type, fromDate, toDate, page);
        }

        public Task<string?> GetVideoURL(int movieId)
        {
            return _movieRepository.GetVideoURL(movieId);
        }
    }
}
