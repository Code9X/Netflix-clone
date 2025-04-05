using netflix_backend.Models.Response;
using System.Text.Json;

namespace netflix_backend.Repository.impl
{
    public class MovieRepository : IMovieRepository
    {
        private readonly HttpClient _httpClient;

        public MovieRepository(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? year, int? page)
        {
            var response = new MovieListResponse();
            try
            {
                var APIKey = "b10739df";
                var queryParams = $"?apikey={APIKey}&s={title}&type={type ?? ""}&y={year ?? ""}&page={page ?? 1}";
                var apiUrl = $"http://www.omdbapi.com/{queryParams}";

                HttpResponseMessage httpResponse = await _httpClient.GetAsync(apiUrl);
                if (!httpResponse.IsSuccessStatusCode)
                {
                    response.StatusCode = httpResponse.StatusCode.ToString();
                    response.Message = "API call failed.";
                    return response;
                }

                string jsonResponse = await httpResponse.Content.ReadAsStringAsync();
                response = JsonSerializer.Deserialize<MovieListResponse>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                response.StatusCode = "200";
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.StatusCode = "500";
                response.Message = $"Error: {ex.Message}";
            }
            return response;
        }
    }
}