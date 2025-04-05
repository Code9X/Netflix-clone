using Microsoft.AspNetCore.Mvc;
using netflix_backend.Models.Response;
using netflix_backend.Services;

namespace netflix_backend.Controllers
{
    [ApiController]
    [Route("/api/Movie/")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("Get")]
        public async Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? year, int? page)
        {
            var response = new MovieListResponse();
            try
            {
                return await _movieService.GetMovieListAsync(title, type, year, page);
            }
            catch (Exception)
            {

                throw;
            }
            return response;
        }
    }
}