using DbRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Repositories
{
    public class SongRepository : BaseRepository, ISongRepository
    {
        public SongRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task CreateSong(Song song)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Songs.Add(song);
                await context.SaveChangesAsync();
            }
        }

        public async Task<Song> GetSongByFullName(string band, string name)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Songs.FirstOrDefaultAsync(x => x.Name.Equals(name) && x.Band.Equals(band));
            }
        }

        public async Task<Song> GetSongById(int id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Songs.FirstOrDefaultAsync(x => x.ID == id);
            }
        }

        public async Task<List<Song>> GetSongsByGenre(Genre genre)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Songs.Where(x => x.Genre == genre).ToListAsync();
            }
        }

        public async Task<List<Song>> GetSongsByLocation(Location location)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Songs.Include(x=>x.State).Where(x => x.State.Location == location).ToListAsync();
            }
        }

        public async Task<List<Song>> GetSongsByMood(Mood mood)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Songs.Include(x => x.State).Where(x => x.State.Mood == mood).ToListAsync();
            }
        }

        public async Task<List<Song>> GetSongsByWeather(Weather weather)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Songs.Include(x => x.State).Where(x => x.State.Weather == weather).ToListAsync();
            }
        }

        public async Task<List<Song>> GetSongsByState(State state)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Songs
                    .Include(x => x.State).Where(x =>
                    x.State.Location == state.Location
                    && x.State.Mood == state.Mood
                    && x.State.Weather == state.Weather)
                    .ToListAsync();
            }
        }


    }
}
