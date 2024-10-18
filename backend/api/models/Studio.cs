namespace api.models
{
    public class Studio
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }

        // Navigation property
        public List<Movies> Movies { get; set; }
    }
}
