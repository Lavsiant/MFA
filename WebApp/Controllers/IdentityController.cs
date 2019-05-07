using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Model;
using Microsoft.AspNetCore.Authorization;
using Services.Interfaces;
using WebApp.Helpers;
using WebApp.Models;

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
    }
}
