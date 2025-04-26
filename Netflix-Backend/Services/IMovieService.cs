using netflix_backend.Models.Response;

namespace netflix_backend.Services
{
    public interface IMovieService
    {
        Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? fromDate, string? toDate, int? page);
        Task<TVShowListResponse> GetTVListAsync(int? Id, string? type, string? fromDate, string? toDate, int? page);
        Task<string?> GetVideoURL(int movieId, string? category = null);
    }
}
