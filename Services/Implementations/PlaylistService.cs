using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbRepository.Interfaces;
using Model;
using Services.Models.Common;
using Services.Interfaces;
using Services.Models.Song;

namespace Services.Implementations
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IIdentityRepository _identityRepository;
        private readonly ISongRepository _songRepository;

        public PlaylistService(IPlaylistRepository playlistRepository, IIdentityRepository identityRepository, ISongRepository songRepository) 
        {
            _identityRepository = identityRepository;
            _playlistRepository = playlistRepository;
            _songRepository = songRepository;
        }

        public async Task CreatePlaylist(Playlist playlist, int userId)
        {
            var user = await _identityRepository.GetUser(userId);
            playlist.Owner = user ?? throw new TypedException(ExceptionType.BadRequest);
            await _playlistRepository.CreatePlaylist(playlist,userId);
        }

        public async Task<Playlist> GetPlaylist(int id)
        {
            return await _playlistRepository.GetPlaylist(id);
        }

        public async Task<Playlist> GetPlaylist(string name)
        {
            return await _playlistRepository.GetPlaylist(name);
        }

        public async Task<List<Playlist>> GetPlaylistsByUser(int userId)
        {
            return await _playlistRepository.GetPlaylistsByUser(userId);
        }

        public async Task AddSongToPlaylist(int songId, int playlistId)
        {
            var song = await _songRepository.GetSongById(songId);
            var playlist = await _playlistRepository.GetPlaylist(playlistId);
            if(!playlist.PlaylistSongs.Any(x=>x.SongId == songId))
            {
                var ps = new PlaylistSong()
                {
                    SongId = songId,
                    PlaylistId = playlistId
                };
                await _playlistRepository.AddSongToPlaylist(ps);
            }

        }
        
        public async Task UpdatePlaylist(PlaylistModel model)
        {
            var playlist = new Playlist()
            {
                Name = model.Name,
                ID = model.ID
            };

            foreach (var song in model.Songs)
            {
                playlist.PlaylistSongs.Add(new PlaylistSong()
                {
                    PlaylistId = playlist.ID,
                    SongId = song.ID
                });
            }

            await _playlistRepository.UpdatePlaylist(playlist);
        }
    }
}
