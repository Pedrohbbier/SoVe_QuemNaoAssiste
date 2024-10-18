using System;

namespace api.models
{
    public class Director
    {
        public int Id { get; set; } // Primary key
        public string Name { get; set; }
        public string Description { get; set; }

        // Navigation property
        public List<Movies> Movies { get; set; }
    }
}
