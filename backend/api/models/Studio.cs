using System.Text.Json.Serialization;

namespace api.models
{
    public class Studio
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Country { get; set; }

        // Navigation property
        [JsonIgnore]
        public  List<Movies>? Movies { get; set; }
    }
}
