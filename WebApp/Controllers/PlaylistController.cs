using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Model;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Helpers;
using WebApp.Models;
using WebApp.ViewModels.Playlist;
using WebApp.ViewModels.Song;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class PlaylistController : Controller
    {
        private readonly IPlaylistService _playlistService;        

        public PlaylistController(IPlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        [Route("create")]
        [HttpPost]
        public async Task<Response> CreatePlaylist([FromBody] PlaylistViewModel playlistViewModel)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var playlist = new Playlist()
                {
                    Name = playlistViewModel.Name
                };
                //Mapper.Map<Playlist>(playlistViewModel);
                await _playlistService.CreatePlaylist(playlist, playlistViewModel.OwnerId);
            });
        }

        [Route("all")]
        [HttpGet]
        public async Task<Response<List<PlaylistViewModel>>> GetAllUserPlaylists(int id)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var playlists = await _playlistService.GetPlaylistsByUser(id);
                var playlistVMs = new List<PlaylistViewModel>();
                foreach (var playlist in playlists)
                {
                    playlistVMs.Add(new PlaylistViewModel()
                    {
                        Name = playlist.Name,
                        Songs = playlist.PlaylistSongs.Select(x => new SongViewModel()
                        {
                            Band = x.Song.Band,
                            State = x.Song.State,
                            Genre = x.Song.Genre,
                            Name = x.Song.Name

                        }).ToList()
                    });
                }
                return playlistVMs;
            });
        }

        [Route("add-song")]
        [HttpGet]
        public async Task<Response> GetAllUserPlaylists(int songId,int playlistId)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                await _playlistService.AddSongToPlaylist(songId,playlistId);
            });
        }
    }
}
