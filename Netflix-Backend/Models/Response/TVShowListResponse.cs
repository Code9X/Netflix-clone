using System.Text.Json.Serialization;

namespace netflix_backend.Models.Response
{
    public class TVShowListResponse
    {
        [JsonPropertyName("page")]
        public int Page { get; set; }

        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("overview")]
        public string Overview { get; set; }

        [JsonPropertyName("poster_path")]
        public string PosterPath { get; set; }

        [JsonPropertyName("backdrop_path")]
        public string BackdropPath { get; set; }

        [JsonPropertyName("vote_average")]
        public double? VoteAverage { get; set; }

        [JsonPropertyName("number_of_seasons")]
        public int? NumberOfSeasons { get; set; }

        [JsonPropertyName("number_of_episodes")]
        public int? NumberOfEpisodes { get; set; }
        public List<Genres> Genres { get; set; }
        [JsonPropertyName("first_air_date")]
        public string FirstAirDate { get; set; }


        [JsonPropertyName("results")]
        public List<TVItem> Results { get; set; }
        public string StatusCode { get; set; }
        public string Message { get; set; }
    }

    public class TVItem
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("poster_path")]
        public string PosterPath { get; set; }

        [JsonPropertyName("overview")]
        public string Overview { get; set; }

        [JsonPropertyName("vote_average")]
        public double VoteAverage { get; set; }

        [JsonPropertyName("first_air_date")]
        public string FirstAirDate { get; set; }

        [JsonPropertyName("backdrop_path")]
        public string BackdropPath { get; set; }
    }

    public class Genres
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }


}
