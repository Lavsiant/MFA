using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbRepository.Interfaces;
using Model;
using WebApp.Services.Interfaces;

namespace WebApp.Services.Implementations
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _songRepository;

        public SongService(ISongRepository songRepository)
        {
            _songRepository = songRepository;
        }

        public async Task CreateSong(Song song)
        {
            throw new NotImplementedException();
        }

        public async Task<Song> GetSongByFullName(string band, string name)
        {
            throw new NotImplementedException();
        }

        public async Task<Song> GetSongById(int id)
        {
            return await _songRepository.GetSongById(id);
        }

        public async Task<List<Song>> GetSongsByGenre(Genre genre)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Song>> GetSongsByLocation(Location mood)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Song>> GetSongsByMood(Mood mood)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Song>> GetSongsByState(State state)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Song>> GetSongsByWeather(Weather mood)
        {
            throw new NotImplementedException();
        }
    }
}
