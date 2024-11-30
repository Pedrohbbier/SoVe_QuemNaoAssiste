namespace api.models
{
    public class MovieReview
    {
        public int Id { get; set; } 
        public int MovieId { get; set; } 
        public required string MovieTitle { get; set; } 
        public required string Comment { get; set; } 
        public int Rating { get; set; } 
    }
}
