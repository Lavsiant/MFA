using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Services.Interfaces
{
    public interface ISongService
    {
        Task<Song> GetSongById(int id);

        Task<Song> GetSongByFullName(string band, string name);

        Task CreateSong(Song song);

        Task<List<Song>> GetSongsByGenre(Genre genre);

        Task<List<Song>> GetSongsByState(State state);

        Task<List<Song>> GetSongsByMood(Mood mood);

        Task<List<Song>> GetSongsByLocation(Location mood);

        Task<List<Song>> GetSongsByWeather(Weather mood);
    }
}
