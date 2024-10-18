using System;
using System.Collections.Generic;

namespace api.models
{
    public class Movies
    {
        public int Id { get; set; } // Primary key
        public string ?Name { get; set; }
        public int DirectorId { get; set; } // Foreign key to Director
        public int StudioId { get; set; } // Foreign key to Studio (if applicable)
        public List<int> ?ActorIds { get; set; } // List of Actor IDs
        public string ?Synopsis { get; set; }
        public string ?Country { get; set; }

        // Navigation properties
        public Director ?Director { get; set; }
        public List<Actors> ?Actors { get; set; }
    }
}
