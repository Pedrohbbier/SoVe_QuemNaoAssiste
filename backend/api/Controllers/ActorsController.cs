using api.data;
using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly MoviesDbContext _context;

        public ActorsController(MoviesDbContext context)
        {
            _context = context;
        }

        // GET: api/Actors
        [HttpGet]
        public async Task<IActionResult> GetActors()
        {
            var actors = await _context.Actors.ToListAsync();
            return Ok(actors);
        }

        // POST: api/Actors
        [HttpPost]
        public async Task<IActionResult> PostActor(Actors actor)
        {
            _context.Actors.Add(actor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetActors), new { id = actor.Id }, actor);
        }

        // PUT: api/Actors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActor(int id, Actors actor)
        {
            if (id != actor.Id)
            {
                return BadRequest();
            }

            _context.Entry(actor).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Actors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActor(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            _context.Actors.Remove(actor);
            await _context.SaveChangesAsync();

            return Ok(actor);
        }

        // POST: api/Actors/5/upload-image
        [HttpPost("{id}/upload-image")]
        public async Task<IActionResult> UploadImage(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Nenhum arquivo enviado.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var actor = await _context.Actors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            actor.ImagePath = $"/uploads/{fileName}";
            await _context.SaveChangesAsync();

            return Ok(new { ImagePath = actor.ImagePath });
        }
    }
}