using System.Text.Json.Serialization;

namespace api.models
{
    public class Director
    {
        public int Id { get; set; } // Primary key
        public string Name { get; set; }
        public string Description { get; set; }

        // Navigation property
        [JsonIgnore]
        public List<Movies> Movies { get; set; }
    }
}
