using Microsoft.EntityFrameworkCore;
using api.models;

namespace api.data
{
    public class MoviesDbContext : DbContext
    {
        // Construtor para injeção de dependência
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options) { }

        // Declaração das tabelas (DbSet)
        public required DbSet<Movies> Movies { get; set; }
        public required DbSet<Director> Directors { get; set; }
        public required DbSet<Actors> Actors { get; set; }
        public required DbSet<Studio> Studios { get; set; }
        public required DbSet<MovieReview> Reviews { get; set; } // Adicionado MovieReview

        // Método para configurar o SQLite
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=movies.db");
        }

        // Configuração de relacionamentos no banco de dados
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Preserva as configurações padrão

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

            // Configuração adicional para MovieReview (se necessário)
            modelBuilder.Entity<MovieReview>()
                .HasOne<Movies>()
                .WithMany() // Caso não tenha navegação inversa
                .HasForeignKey(r => r.MovieId)
                .OnDelete(DeleteBehavior.Cascade); // Excluir avaliações ao deletar filmes
        }
    }
}
