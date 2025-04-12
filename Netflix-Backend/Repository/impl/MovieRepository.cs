using netflix_backend.Models.Response;
using System.Net.Http.Headers;
using System.Text.Json;

namespace netflix_backend.Repository.impl
{
    public class MovieRepository : IMovieRepository
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public MovieRepository(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClient = httpClientFactory.CreateClient();
        }
        public async Task<MovieListResponse> GetMovieListAsync(string? title, string? type, string? fromDate, string? toDate, int? page)
        {
            var response = new MovieListResponse();
            try
            {
                var token = _configuration["AppSettings:ApiToken"];
                var fulltoken = "Bearer " + token;
                string apiUrl;

                if (!string.IsNullOrEmpty(title))
                {
                    apiUrl = $"https://api.themoviedb.org/3/search/movie?query={Uri.EscapeDataString(title)}&page={page ?? 1}";
                }
                else
                {
                    type = type?.ToLower();
                    apiUrl = type switch
                    {
                        "popular" => $"https://api.themoviedb.org/3/movie/popular?page={page ?? 1}",
                        "blockbuster" => $"https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&page={page ?? 1}",
                        "upcoming" => $"https://api.themoviedb.org/3/movie/upcoming?page={page ?? 1}",
                        "top_rated" => $"https://api.themoviedb.org/3/movie/top_rated?page={page ?? 1}",
                        "now_playing" => $"https://api.themoviedb.org/3/movie/now_playing?page={page ?? 1}",
                        "action" => $"https://api.themoviedb.org/3/discover/movie?with_genres=28&page={page ?? 1}",
                        "comedy" => $"https://api.themoviedb.org/3/discover/movie?with_genres=35&page={page ?? 1}",
                        "drama" => $"https://api.themoviedb.org/3/discover/movie?with_genres=18&page={page ?? 1}",
                        "horror" => $"https://api.themoviedb.org/3/discover/movie?with_genres=27&page={page ?? 1}",
                        "romance" => $"https://api.themoviedb.org/3/discover/movie?with_genres=10749&page={page ?? 1}",
                        "animation" => $"https://api.themoviedb.org/3/discover/movie?with_genres=16&page={page ?? 1}",
                        "sci-fi" => $"https://api.themoviedb.org/3/discover/movie?with_genres=878&page={page ?? 1}",
                        "fantasy" => $"https://api.themoviedb.org/3/discover/movie?with_genres=14&page={page ?? 1}",
                        "thriller" => $"https://api.themoviedb.org/3/discover/movie?with_genres=53&page={page ?? 1}",
                        "crime" => $"https://api.themoviedb.org/3/discover/movie?with_genres=80&page={page ?? 1}",
                        "family" => $"https://api.themoviedb.org/3/discover/movie?with_genres=10751&page={page ?? 1}",
                        "documentary" => $"https://api.themoviedb.org/3/discover/movie?with_genres=99&page={page ?? 1}",
                        _ => $"https://api.themoviedb.org/3/movie/popular?page={page ?? 1}"
                    };
                }
                if (!string.IsNullOrEmpty(fromDate) && !string.IsNullOrEmpty(toDate))
                {
                    var currentYear = DateTime.Now.Year;

                    apiUrl += $"&primary_release_date.gte={fromDate}&primary_release_date.lte={toDate}";
                }

                var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);
                request.Headers.Add("Authorization", fulltoken);
                request.Headers.Add("Accept", "application/json");

                HttpResponseMessage httpResponse = await _httpClient.SendAsync(request);
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
        public async Task<MovieListResponse> GetTVListAsync(string? title, string? type, string? fromDate, string? toDate, int? page)
        {
            var response = new MovieListResponse();
            try
            {
                var token = _configuration["AppSettings:ApiToken"];
                var fulltoken = "Bearer " + token;
                string apiUrl;

                if (!string.IsNullOrEmpty(title))
                {
                    apiUrl = $"https://api.themoviedb.org/3/search/tv?query={Uri.EscapeDataString(title)}&page={page ?? 1}";
                }
                else
                {
                    type = type?.ToLower();
                    apiUrl = type switch
                    {
                        "popular" => $"https://api.themoviedb.org/3/tv/popular?page={page ?? 1}",
                        "top_rated" => $"https://api.themoviedb.org/3/tv/top_rated?page={page ?? 1}",
                        "airing_today" => $"https://api.themoviedb.org/3/tv/airing_today?page={page ?? 1}",
                        "on_the_air" => $"https://api.themoviedb.org/3/tv/on_the_air?page={page ?? 1}",
                        "action" => $"https://api.themoviedb.org/3/discover/tv?with_genres=10759&page={page ?? 1}",
                        "comedy" => $"https://api.themoviedb.org/3/discover/tv?with_genres=35&page={page ?? 1}",
                        "drama" => $"https://api.themoviedb.org/3/discover/tv?with_genres=18&page={page ?? 1}",
                        "documentary" => $"https://api.themoviedb.org/3/discover/tv?with_genres=99&page={page ?? 1}",
                        "family" => $"https://api.themoviedb.org/3/discover/tv?with_genres=10751&page={page ?? 1}",
                        "reality" => $"https://api.themoviedb.org/3/discover/tv?with_genres=10764&page={page ?? 1}",
                        "sci-fi" => $"https://api.themoviedb.org/3/discover/tv?with_genres=10765&page={page ?? 1}",
                        "mystery" => $"https://api.themoviedb.org/3/discover/tv?with_genres=9648&page={page ?? 1}",
                        _ => $"https://api.themoviedb.org/3/tv/popular?page={page ?? 1}"
                    };
                }

                if (!string.IsNullOrEmpty(fromDate) && !string.IsNullOrEmpty(toDate))
                {
                    apiUrl += $"&first_air_date.gte={fromDate}&first_air_date.lte={toDate}";
                }

                var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);
                request.Headers.Add("Authorization", fulltoken);
                request.Headers.Add("Accept", "application/json");

                HttpResponseMessage httpResponse = await _httpClient.SendAsync(request);
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
        public async Task<string?> GetVideoURL(int movieId)
        {
            try
            {
                var token = _configuration["AppSettings:ApiToken"];
                var apiUrl = $"https://api.themoviedb.org/3/movie/{movieId}/videos";
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(apiUrl);
                if (!response.IsSuccessStatusCode) return null;

                var json = await response.Content.ReadAsStringAsync();
                var videoData = JsonSerializer.Deserialize<VideoKeyResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                var trailer = videoData?.Results?
                              .FirstOrDefault(v => v.Site == "YouTube" && v.Name.Contains("Official Trailer", StringComparison.OrdinalIgnoreCase))
                              ?? videoData?.Results?
                              .FirstOrDefault(v => v.Site == "YouTube" && v.Type == "Trailer" && v.Official)
                              ?? videoData?.Results?
                              .FirstOrDefault(v => v.Site == "YouTube" && v.Type == "Trailer")
                              ?? videoData?.Results?
                              .FirstOrDefault(v => v.Site == "YouTube" && v.Type == "Teaser" && v.Official)
                              ?? videoData?.Results?
                              .FirstOrDefault(v => v.Site == "YouTube" && v.Type == "Teaser");

                return trailer != null ? $"https://www.youtube.com/embed/{trailer.Key}" : null;
            }
            catch
            {
                return null;
            }
        }
    }
}