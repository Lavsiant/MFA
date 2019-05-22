using Microsoft.AspNetCore.Mvc;
using Model;
using Services.Interfaces;
using Services.Models.Song;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class SmartController : Controller
    {
        private readonly ISmartSerachService _smartSerachService;

        public SmartController(ISmartSerachService smartSerachService)
        {
            _smartSerachService = smartSerachService;
        }

        [HttpGet]
        [Route("get")]
        public async Task<PlaylistVM> SmartSearch(Mood mood,Weather weather, Location location,int id,int count,string playlist)
        {
            return await _smartSerachService.LoadPlaylistWithSmartSearch(
                new State() { Location = location, Weather = weather, Mood = mood },
                id,
                count,
                playlist);

        }
    }
}
