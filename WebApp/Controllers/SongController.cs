using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Model;
using Services.Interfaces;
using Services.Models.Song;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Helpers;
using WebApp.Models;
using WebApp.ViewModels.Song;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class SongController : Controller
    {
        private readonly ISongService _songService;

        public SongController(ISongService songService)
        {
            _songService = songService;
        }

        [Route("create")]
        [HttpPost]
        public async Task<Response> CreateSong([FromBody] SongViewModel model)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var songModel = new Song()
                {
                    State = model.State,
                    Name = model.Name,
                    Genre = model.Genre,
                    Band = model.Band
                };
                await _songService.CreateSong(songModel);
            });
        }

        [Route("filter")]
        [HttpGet]
        public async Task<Response<List<Song>>> GetSongsByFilter(Genre genre, Location location, Weather weather, Mood mood)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                return await _songService.GetFilteredSongs(new State()
                {
                    Weather = weather,
                    Location = location,
                    Mood = mood
                },
                genre);
            });
        }

        [Route("id")]
        [HttpGet]
        public async Task<Response<Song>> GetSongById(int id)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                return await _songService.GetSongById(id);
            });
        }


    }
}
