using System.Text.Json.Serialization;

namespace api.models
{
    public class Director
    {
        public int Id { get; set; } // Primary key
        public required string Name { get; set; }
        public required string Description { get; set; }

        // Navigation property
        [JsonIgnore]
        public required List<Movies> Movies { get; set; }
    }
}
