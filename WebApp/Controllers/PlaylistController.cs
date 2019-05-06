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
        public async Task<Response> CreatePlaylist(PlaylistViewModel playlistViewModel)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var playlist = Mapper.Map<Playlist>(playlistViewModel);
                await _playlistService.CreatePlaylist(playlist, playlistViewModel.OwnerId);
            });
        }

        [Route("all")]
        [HttpGet]
        public async Task<Response> GetAllUserPlaylists(int id)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                return await _playlistService.GetPlaylistsByUser(id);
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
