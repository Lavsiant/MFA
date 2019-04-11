using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.ViewModels.Playlist;

namespace WebApp.Services.Interfaces
{
    public interface IPlaylistService
    {
        Task CreatePlaylist(Playlist playlist, int userId);

        Task UpdatePlaylist(PlaylistViewModel playlist);

        Task<Playlist> GetPlaylist(int id);

        Task<Playlist> GetPlaylist(string id);
    }
}
