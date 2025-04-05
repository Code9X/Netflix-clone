using netflix_backend.Models.Response;

namespace netflix_backend.Services
{
    public interface IMovieService
    {
        Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? year, int? page);
    }
}
