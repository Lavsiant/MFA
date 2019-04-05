using WebApp.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(AuthenticationSchemes = "Basic", Roles = "Admin")]
        public async Task<ICollection<User>> GetAllUsers()
        {
            var users = new List<User>();
            try
            {
                users = await _identityService.GetAllUsers();
            }
            catch (Exception ex)
            {

            }
            return users;
        }
    }
}
