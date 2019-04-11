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
    public class PlaylistRepository : BaseRepository, IPlaylistRepository
    {
        public PlaylistRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task CreatePlaylist(Playlist playlist)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Playlists.Add(playlist);
                await context.SaveChangesAsync();
            }
        }

        public async Task<Playlist> GetPlaylist(int id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Playlists.Include(x => x.PlaylistSongs).FirstOrDefaultAsync(x => x.ID == id);
            }
        }

        public async Task<Playlist> GetPlaylist(string name)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Playlists.Include(x => x.PlaylistSongs).FirstOrDefaultAsync(x => x.Name == name);
            }
        }

        public async Task UpdatePlaylist(Playlist updatedPlaylist)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var playlist = await context.Playlists.Include(x => x.PlaylistSongs).FirstOrDefaultAsync(x => x.ID == updatedPlaylist.ID);
                playlist.Name = updatedPlaylist.Name;
                playlist.PlaylistSongs = updatedPlaylist.PlaylistSongs;
                await context.SaveChangesAsync();
            }
        }
    }
}
