using netflix_backend.Models.Response;

namespace netflix_backend.Repository
{
    public interface IMovieRepository
    {
        Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? fromDate, string? toDate, int? page);
        Task<MovieListResponse> GetTVListAsync(string? title, string? type, string? fromDate, string? toDate, int? page);
        Task<string?> GetVideoURL(int movieId);
    }
}
