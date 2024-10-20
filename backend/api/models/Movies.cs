using System.Text.Json.Serialization;

namespace api.models
{
    public class Movies
    {
        public int Id { get; set; } // Primary key
        public string Name { get; set; }
        public int DirectorId { get; set; } // Foreign key to Director
        public int StudioId { get; set; } // Foreign key to Studio
        public List<int> ActorIds { get; set; } // List of Actor IDs
        public string Synopsis { get; set; }
        public string Country { get; set; }

        // Navigation properties
        public Director Director { get; set; }
        public Studio Studio { get; set; } // Adicionando a propriedade Studio

        [JsonIgnore]
        public List<Actors> Actors { get; set; }
    }
}
