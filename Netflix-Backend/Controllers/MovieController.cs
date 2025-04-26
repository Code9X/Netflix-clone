using Microsoft.AspNetCore.Mvc;
using netflix_backend.Models.Response;
using netflix_backend.Services;

namespace netflix_backend.Controllers
{
    [ApiController]
    [Route("/api/")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("Movie/Get")]
        public async Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? fromDate, string? toDate, int? page)
        {
            var response = new MovieListResponse();
            try
            {
                return await _movieService.GetMovieListAsync(title, type, fromDate, toDate, page);
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
        [HttpGet("TV/Get")]
        public async Task<TVShowListResponse> GetTVListAsync(int? Id, string? type, string? fromDate, string? toDate, int? page)
        {
            var response = new TVShowListResponse();
            try
            {
                return await _movieService.GetTVListAsync(Id, type, fromDate, toDate, page);
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
        [HttpGet("Get/VideoURL")]
        public async Task<string?> GetVideoURL(int movieId, string? category = null)
        {
            var response = new MovieListResponse();
            try
            {
                return await _movieService.GetVideoURL(movieId, category);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}