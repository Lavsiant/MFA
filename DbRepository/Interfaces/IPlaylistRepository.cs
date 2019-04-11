using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IPlaylistRepository
    {
        Task CreatePlaylist(Playlist playlist);

        Task UpdatePlaylist(Playlist playlist);

        Task<Playlist> GetPlaylist(int id);

        Task<Playlist> GetPlaylist(string id);
    }
}
