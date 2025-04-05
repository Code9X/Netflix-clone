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
        public Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? year, int? page)
        {
            return _movieRepository.GetMovieListAsync(title, type, year, page);
        }
    }
}
