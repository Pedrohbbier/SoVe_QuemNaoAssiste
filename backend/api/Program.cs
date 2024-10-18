using api.data;
using api.models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<MoviesDbContext>();

// Configure CORS to allow requests from the React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:3000") // Front-end URL
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();

app.UseCors("AllowReactApp");


// Ensure the database is created and updated with migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MoviesDbContext>();
    dbContext.Database.Migrate(); // Applies any pending migrations
}

// Routes for Movies

app.MapGet("/movies", async (MoviesDbContext db) =>
    await db.Movies
            .Include(m => m.Director)  // Inclui o Diretor
            .Include(m => m.Actors)    // Inclui os Atores
            .Include(m => m.Studio)    // Inclui o Studio
            .ToListAsync());


app.MapGet("/movies/{id}", async (int id, MoviesDbContext db) =>
    await db.Movies.Include(m => m.Director).Include(m => m.Actors).FirstOrDefaultAsync(m => m.Id == id) is Movies movie
    ? Results.Ok(movie)
    : Results.NotFound());

app.MapPost("/movies", async (Movies movie, MoviesDbContext db) =>
{
    db.Movies.Add(movie);
    await db.SaveChangesAsync();
    return Results.Created($"/movies/{movie.Id}", movie);
});

app.MapPut("/movies/{id}", async (int id, Movies updatedMovie, MoviesDbContext db) =>
{
    var movie = await db.Movies.FindAsync(id);

    if (movie is null) return Results.NotFound();

    movie.Name = updatedMovie.Name;
    movie.DirectorId = updatedMovie.DirectorId;
    movie.StudioId = updatedMovie.StudioId;
    movie.ActorIds = updatedMovie.ActorIds;
    movie.Synopsis = updatedMovie.Synopsis;
    movie.Country = updatedMovie.Country;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/movies/{id}", async (int id, MoviesDbContext db) =>
{
    var movie = await db.Movies.FindAsync(id);

    if (movie is null) return Results.NotFound();

    db.Movies.Remove(movie);
    await db.SaveChangesAsync();
    return Results.Ok(movie);
});

// Routes for Directors

app.MapGet("/directors", async (MoviesDbContext db) =>
    await db.Directors.ToListAsync());

app.MapGet("/directors/{id}", async (int id, MoviesDbContext db) =>
    await db.Directors.FindAsync(id) is Director director
    ? Results.Ok(director)
    : Results.NotFound());

app.MapPost("/directors", async (Director director, MoviesDbContext db) =>
{
    db.Directors.Add(director);
    await db.SaveChangesAsync();
    return Results.Created($"/directors/{director.Id}", director);
});

app.MapPut("/directors/{id}", async (int id, Director updatedDirector, MoviesDbContext db) =>
{
    var director = await db.Directors.FindAsync(id);

    if (director is null) return Results.NotFound();

    director.Name = updatedDirector.Name;
    director.Description = updatedDirector.Description;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/directors/{id}", async (int id, MoviesDbContext db) =>
{
    var director = await db.Directors.FindAsync(id);

    if (director is null) return Results.NotFound();

    db.Directors.Remove(director);
    await db.SaveChangesAsync();
    return Results.Ok(director);
});

// Routes for Actors

app.MapGet("/actors", async (MoviesDbContext db) =>
    await db.Actors.ToListAsync());

app.MapGet("/actors/{id}", async (int id, MoviesDbContext db) =>
    await db.Actors.FindAsync(id) is Actors actor
    ? Results.Ok(actor)
    : Results.NotFound());

app.MapPost("/actors", async (Actors actor, MoviesDbContext db) =>
{
    db.Actors.Add(actor);
    await db.SaveChangesAsync();
    return Results.Created($"/actors/{actor.Id}", actor);
});

app.MapPut("/actors/{id}", async (int id, Actors updatedActor, MoviesDbContext db) =>
{
    var actor = await db.Actors.FindAsync(id);

    if (actor is null) return Results.NotFound();

    actor.Name = updatedActor.Name;
    actor.Description = updatedActor.Description;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/actors/{id}", async (int id, MoviesDbContext db) =>
{
    var actor = await db.Actors.FindAsync(id);

    if (actor is null) return Results.NotFound();

    db.Actors.Remove(actor);
    await db.SaveChangesAsync();
    return Results.Ok(actor);
});

// Routes for Studios
app.MapGet("/studios", async (MoviesDbContext db) =>
    await db.Studios.ToListAsync());

app.MapGet("/studios/{id}", async (int id, MoviesDbContext db) =>
    await db.Studios.FindAsync(id) is Studio studio
    ? Results.Ok(studio)
    : Results.NotFound());

app.MapPost("/studios", async (Studio studio, MoviesDbContext db) =>
{
    db.Studios.Add(studio);
    await db.SaveChangesAsync();
    return Results.Created($"/studios/{studio.Id}", studio);
});

app.MapPut("/studios/{id}", async (int id, Studio updatedStudio, MoviesDbContext db) =>
{
    var studio = await db.Studios.FindAsync(id);

    if (studio is null) return Results.NotFound();

    studio.Name = updatedStudio.Name;
    studio.Country = updatedStudio.Country;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/studios/{id}", async (int id, MoviesDbContext db) =>
{
    var studio = await db.Studios.FindAsync(id);

    if (studio is null) return Results.NotFound();

    db.Studios.Remove(studio);
    await db.SaveChangesAsync();
    return Results.Ok(studio);
});


app.Run();
