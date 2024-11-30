using System.Text.Json.Serialization;

namespace api.models
{
    public class Movies
    {
        public int Id { get; set; } // Primary key
        public required string Name { get; set; }
        public int DirectorId { get; set; } // Foreign key to Director
        public int StudioId { get; set; } // Foreign key to Studio
        public required List<int> ActorIds { get; set; } // List of Actor IDs
        public required string Synopsis { get; set; }
        public required string Country { get; set; }

        [JsonIgnore]
        // Navigation properties
        public Director ?Director { get; set; }
        public Studio ?Studio { get; set; } // Adicionando a propriedade Studio

        public List<Actors> ?Actors { get; set; }
    }
}
