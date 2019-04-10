
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Song;
using System;
using System.Collections.Generic;
using System.Text;

namespace DbRepository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        private void SetInitialData()
        {
            var genres = new List<BasicGenre>()
            {
                new BasicGenre()
                {
                    Name = "Rock",
                    Type = BasicGenreType.Rock,
                    Genres = new List<Genre>()
                    {
                        new Genre("Func",GenreType.FunkRock),
                        new Genre("Classic rock", GenreType.ClassicRock),
                        new Genre("Dance rock", GenreType.DanceRock),
                        new Genre("Blues rock", GenreType.BluesRock),
                        new Genre("Alternative", GenreType.AlternativeRock)

                    }
            }
        }
    }
    }
}
