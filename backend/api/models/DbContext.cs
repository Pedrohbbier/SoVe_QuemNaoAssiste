using Microsoft.EntityFrameworkCore;
using api.models;

namespace api.data
{
    public class MoviesDbContext : DbContext
    {
        public DbSet<Movies> Movies { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Actors> Actors { get; set; }
        public DbSet<Studio> Studios { get; set; } // Adicionando Studio

        // Método para configurar o SQLite
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=movies.db");
        }

        // Configuração de relacionamentos no banco de dados
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração de relacionamento entre Movies e Director
            modelBuilder.Entity<Movies>()
                .HasOne(m => m.Director)
                .WithMany(d => d.Movies)
                .HasForeignKey(m => m.DirectorId);

            // Configuração de relacionamento muitos-para-muitos entre Movies e Actors
            modelBuilder.Entity<Movies>()
                .HasMany(m => m.Actors)
                .WithMany(a => a.Movies);

            // Configuração de relacionamento entre Movies e Studio
            modelBuilder.Entity<Movies>()
                .HasOne(m => m.Studio)
                .WithMany(s => s.Movies)
                .HasForeignKey(m => m.StudioId);
        }
    }
}
