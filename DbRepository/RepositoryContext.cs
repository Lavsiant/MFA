
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model;
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

        public DbSet<Song> Songs { get; set; }

        public DbSet<PlaylistSong> PlaylistSongs { get; set; }

        public DbSet<Playlist> Playlists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PlaylistSong>()
                .HasKey(t => new { t.PlaylistId, t.SongId});
        }
    
    }
}
