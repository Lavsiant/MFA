using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbRepository.Interfaces;
using Model;
using WebApp.Models.Exceptions;
using WebApp.Services.Interfaces;
using WebApp.ViewModels.Playlist;

namespace WebApp.Services.Implementations
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IIdentityRepository _identityRepository;

        public PlaylistService(IPlaylistRepository playlistRepository, IIdentityRepository identityRepository)
        {
            _identityRepository = identityRepository;
            _playlistRepository = playlistRepository;
        }

        public async Task CreatePlaylist(Playlist playlist, int userId)
        {
            var user = await _identityRepository.GetUser(userId);
            playlist.Owner = user ?? throw new TypedException(ExceptionType.BadRequest);
        }

        public async Task<Playlist> GetPlaylist(int id)
        {
            return await _playlistRepository.GetPlaylist(id);
        }

        public async Task<Playlist> GetPlaylist(string name)
        {
            return await _playlistRepository.GetPlaylist(name);
        }

        public async Task UpdatePlaylist(PlaylistViewModel vm)
        {
            var playlist = new Playlist()
            {
                Name = vm.Name,
                ID = vm.ID
            };

            foreach (var song in vm.Songs)
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
