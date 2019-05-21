using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Model;
using Microsoft.AspNetCore.Authorization;
using Services.Interfaces;
using WebApp.Helpers;
using WebApp.Models;
using WebApp.ViewModels;
using System.Linq;
using Model;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [Route("all")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = "Basic", Roles = "Admin")]
        public async Task<Response<List<User>>> GetAllUsers()
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                return await _identityService.GetAllUsers();
            });
           
        }

        [Route("id")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = "Basic", Roles = "Admin")]
        public async Task<Response<User>> GetUser(string id)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                return await _identityService.GetUser(id);
            });
        }

        [Route("update")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Basic")]
        public async Task<Response<User>> UpdateUser([FromBody] UserViewModel userViewModel)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var user = new User()
                {
                    Email = userViewModel.email,
                    Login = userViewModel.login,
                    Password = userViewModel.password,
                    ID = userViewModel.id
                };
                 return await _identityService.UpdateUser(user);
                    
            });
        }

        [Route("delete")]
        [HttpDelete]
        //[Authorize(AuthenticationSchemes = "Basic", Roles = "Admin")]
        public async Task<Response> DeleteUser(int id)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                await _identityService.DeleteUser(id);
            });
        }

        [Route("preferences-update")]
        [HttpPost]
        public async Task<Response> UpdateGenrePreferences([FromBody] List<GenrePreference> genrePreferences, [FromQuery] string username)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                await _identityService.UpdateGenrePreferences(genrePreferences, username);
            });
        }

        [Route("get-preferences")]
        [HttpGet]
        public async Task<Response<List<GenrePreference>>> UpdateGenrePreferences([FromQuery] string username)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var result = await _identityService.GetGenrePreferences(username);
                return result.OrderBy(x => x.Genre).ToList();
            });
        }

        [Route("playlists")]
        [HttpGet]
        public async Task<Response<List<Playlist>>> GetUserPlaylists([FromQuery] string username)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var res = await _identityService.GetUserPlaylists(username);
                foreach (var item in res)
                {
                    item.Owner = null;
                    item.PlaylistSongs = null;
                }
                return res;
              
            });
        }
    }
}
