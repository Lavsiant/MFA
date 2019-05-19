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
        public async Task<Response> CreatePlaylist([FromBody] PlaylistViewModel playlistViewModel, [FromQuery] int userId)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var playlist = new Playlist()
                {
                    Name = playlistViewModel.Name
                };
                //Mapper.Map<Playlist>(playlistViewModel);
                await _playlistService.CreatePlaylist(playlist,userId);
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
                        ID = playlist.ID,
                        Name = playlist.Name,
                        Songs = playlist.PlaylistSongs.Select(x => new SongViewModel()
                        {
                            Band = x.Song.Band,
                            State = x.Song.State,
                            Genre = x.Song.Genre,
                            Name = x.Song.Name,
                            id = x.Song.ID

                        }).ToList()
                    });
                }
                return playlistVMs;
            });
        }

        [Route("add-song")]
        [HttpGet]
        public async Task<Response> GetAllUserPlaylists([FromQuery] int songId, [FromQuery] int playlistId)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                await _playlistService.AddSongToPlaylist(songId,playlistId);
            });
        }

        [Route("delete-song")]
        [HttpGet]
        public async Task<Response> DeleteSong([FromQuery] int songId, [FromQuery] int playlistId)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                await _playlistService.DeleteSongFromPlaylist(songId, playlistId);
            });
        }
    }
}
