using Model;
using Services.Models.Song;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ISmartSerachService
    {
        Task<PlaylistVM> LoadPlaylistWithSmartSearch(State state, int userId, int maxCount, string playlistName);
    }
}
