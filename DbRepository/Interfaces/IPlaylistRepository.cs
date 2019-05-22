using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IPlaylistRepository
    {
        Task CreatePlaylist(Playlist playlist, int user);

        Task UpdatePlaylist(Playlist playlist);

        Task<Playlist> GetPlaylist(int id);

        Task<Playlist> GetPlaylist(string id);

        Task<List<Playlist>> GetPlaylistsByUser(int id);

        Task AddSongToPlaylist(PlaylistSong playlistSong);

        Task DeleteSongFromPlaylist(int songId, int playlistId);

        Task DeletePlaylist(string name, int userId);

        Task<Playlist> CreatePlaylistWithReturn(Playlist playlist, int userId);
    }
}
