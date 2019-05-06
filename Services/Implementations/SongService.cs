using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbRepository.Interfaces;
using Model;
using Services.Interfaces;

namespace Services.Implementations
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
            await _songRepository.CreateSong(song);
        }

        public async Task<Song> GetSongByFullName(string band, string name)
        {
            return await _songRepository.GetSongByFullName(band, name);
        }

        public async Task<Song> GetSongById(int id)
        {
            return await _songRepository.GetSongById(id);
        }

        public async Task<List<Song>> GetSongsByGenre(Genre genre)
        {
            return await _songRepository.GetSongsByGenre(genre);
        }

        public async Task<List<Song>> GetSongsByLocation(Location location)
        {
            return await _songRepository.GetSongsByLocation(location);
        }

        public async Task<List<Song>> GetSongsByMood(Mood mood)
        {
            return await _songRepository.GetSongsByMood(mood);
        }

        public async Task<List<Song>> GetSongsByState(State state)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Song>> GetFilteredSongs(State state, Genre genre)
        {
            var songs = await _songRepository.GetAllSongs();
            if (genre != Genre.Undefined)
            {
                songs = songs.Where(x => x.Genre == genre).ToList();
            }

            if (state != null)
            {
                if (state.Location != Location.Undefined)
                {
                    songs = songs.Where(x => x.State.Location == state.Location).ToList();
                }
                if (state.Mood != Mood.Undefined)
                {
                    songs = songs.Where(x => x.State.Mood == state.Mood).ToList();
                }
                if (state.Weather != Weather.Undefined)
                {
                    songs = songs.Where(x => x.State.Weather == state.Weather).ToList();
                }
            }

            return songs;
        }

        public async Task<List<Song>> GetSongsByWeather(Weather mood)
        {
            return await _songRepository.GetSongsByWeather(mood);
        }

        public async Task<List<Song>> GetAllSongs()
        {
            return await _songRepository.GetAllSongs();
        }
    }
}
