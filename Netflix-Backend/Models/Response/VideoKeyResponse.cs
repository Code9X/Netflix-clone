using Microsoft.AspNetCore.Mvc;

namespace netflix_backend.Models.Response
{
    public class VideoKeyResponse
    {
        public int Id { get; set; }
        public List<VideoResult> Results { get; set; }
    }
    public class VideoResult
    {
        public string Iso_639_1 { get; set; }
        public string Iso_3166_1 { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
        public string Site { get; set; }
        public int Size { get; set; }
        public string Type { get; set; }
        public bool Official { get; set; }
        public DateTime Published_At { get; set; }
        public string Id { get; set; }
    }
}
