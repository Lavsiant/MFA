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
        public async Task<Response> UpdateUser(UserViewModel userViewModel)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var user = new User()
                {
                    Email = userViewModel.Email,
                    Login = userViewModel.Login,
                    ID = userViewModel.ID
                };
                 await _identityService.UpdateUser(user);
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
        [Authorize(AuthenticationSchemes = "Basic")]
        public async Task<Response> UpdateGenrePreferences([FromBody] List<GenrePreference> genrePreferences, [FromQuery] int userId)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                await _identityService.UpdateGenrePreferences(genrePreferences, userId);
            });
        }
    }
}
