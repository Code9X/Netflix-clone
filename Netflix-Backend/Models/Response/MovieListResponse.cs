using netflix_backend.Models.Request;

namespace netflix_backend.Models.Response
{
    public class MovieListResponse
    {
        public string StatusCode { get; set; }
        public string Message { get; set; }
        public string TotalResults { get; set; }
        public List<MovieList> Search { get; set; }
    }
}
