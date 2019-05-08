using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ISmartSerachService
    {
        Task<Playlist> LoadPlaylistWithSmartSearch(State state, int userId);
    }
}
