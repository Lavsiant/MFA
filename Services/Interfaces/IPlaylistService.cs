using Model;
using Services.Models.Song;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IPlaylistService
    {
        Task CreatePlaylist(Playlist playlist, int userId);

        Task UpdatePlaylist(PlaylistModel playlist);

        Task<Playlist> GetPlaylist(int id);

        Task<Playlist> GetPlaylist(string id);

        Task<List<Playlist>> GetPlaylistsByUser(int userId);

        Task AddSongToPlaylist(int songId, int playlistId);

        Task DeleteSongFromPlaylist(int songId, int playlistId);
    }
}
