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
    public class DirectorsController : ControllerBase
    {
        private readonly MoviesDbContext _context;

        public DirectorsController(MoviesDbContext context)
        {
            _context = context;
        }

        // GET: api/Directors
        [HttpGet]
        public async Task<IActionResult> GetDirectors()
        {
            var directors = await _context.Directors.ToListAsync();
            return Ok(directors);
        }

        // POST: api/Directors
        [HttpPost]
        public async Task<IActionResult> PostDirector(Director director)
        {
            _context.Directors.Add(director);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDirectors), new { id = director.Id }, director);
        }

        // PUT: api/Directors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDirector(int id, Director director)
        {
            if (id != director.Id)
            {
                return BadRequest();
            }

            _context.Entry(director).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Directors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDirector(int id)
        {
            var director = await _context.Directors.FindAsync(id);
            if (director == null)
            {
                return NotFound();
            }

            _context.Directors.Remove(director);
            await _context.SaveChangesAsync();

            return Ok(director);
        }
    }
}