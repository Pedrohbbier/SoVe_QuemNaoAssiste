using Microsoft.EntityFrameworkCore;
using api.models;

namespace api.data
{
    public class MoviesDbContext : DbContext
    {
        public DbSet<Movies> Movies { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Actors> Actors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=movies.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurations for relationships

            modelBuilder.Entity<Movies>()
                .HasOne(m => m.Director)
                .WithMany(d => d.Movies)
                .HasForeignKey(m => m.DirectorId);

            modelBuilder.Entity<Movies>()
                .HasMany(m => m.Actors)
                .WithMany(a => a.Movies);
        }
    }
}
