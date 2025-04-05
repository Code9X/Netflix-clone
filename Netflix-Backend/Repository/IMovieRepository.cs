using netflix_backend.Models.Response;

namespace netflix_backend.Repository
{
    public interface IMovieRepository
    {
        Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? year, int? page);
    }
}
