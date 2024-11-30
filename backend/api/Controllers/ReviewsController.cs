using api.data;
using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [ApiController]
    [Route("api/reviews")]
    public class ReviewsController : ControllerBase
    {
        private readonly MoviesDbContext _context;

        public ReviewsController(MoviesDbContext context)
        {
            _context = context;
        }

        // Criar uma nova avaliação
        [HttpPost]
        public async Task<IActionResult> PostReview([FromBody] MovieReview review)
        {
            if (review == null || string.IsNullOrWhiteSpace(review.Comment) || review.Rating < 0 || review.Rating > 5)
            {
                return BadRequest("Dados inválidos. Certifique-se de que a nota está entre 0 e 5, e o comentário não está vazio.");
            }

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Avaliação adicionada com sucesso!", review });
        }

        // Obter todas as avaliações
        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            var reviews = await _context.Reviews.ToListAsync();
            return Ok(reviews);
        }
    }
}
