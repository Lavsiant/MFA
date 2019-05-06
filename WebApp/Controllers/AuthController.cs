using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Services.Interfaces;
using Services.Models.Auth;
using System.Threading.Tasks;
using WebApp.Helpers;
using WebApp.Models;
using WebApp.ViewModels;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IIdentityService _identityService;
        private readonly IExceptionService _exceptionService;

        public AuthController(IAuthService authService, IExceptionService exceptionService, IIdentityService identityService)
        {
            _authService = authService;
            _exceptionService = exceptionService;
            _identityService = identityService;
        }

        [Route("login")]
        [HttpPost]
        public async Task<Response<UserViewModel>> Login([FromBody] LoginViewModel loginVM)
        {
            return await RequestHandler.ExecuteRequestAsync<UserViewModel>(async () =>
            {
                var user = await _authService.Login(Mapper.Map<LoginModel>(loginVM));
                UpdateCookieToken(user.Token, user.Login);
                return Mapper.Map<UserViewModel>(user);
            });
        }

        [Route("register")]
        [HttpPost]
        public async Task<Response<UserViewModel>> Register([FromBody] RegisterViewModel registerVM)
        {
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                var user = await _authService.Register(Mapper.Map<RegisterModel>(registerVM));
                UpdateCookieToken(user.Token, registerVM.Login);
                return Mapper.Map<UserViewModel>(user);
            });
        }

        [Route("logout")]
        [HttpPost]
        public Response Logout()
        {
            return RequestHandler.ExecuteRequest(() =>
            {
                DeleteCookie();
            });
        }

        [Route("current")]
        [HttpGet]
        public async Task<Response<User>> GetCurrentUser()
        {
            var request = HttpContext.Request;
            var username = request.Cookies["user"];
            return await RequestHandler.ExecuteRequestAsync(async () =>
            {
                return !string.IsNullOrEmpty(username) ? await _identityService.GetUser(username) : null;
            });
        }

        private void UpdateCookieToken(Token token, string username = null)
        {
            var response = HttpContext.Response;
            response.Cookies.Delete("token");
            response.Cookies.Delete("user");
            response.Cookies.Append("token", token.Value, new CookieOptions() { Expires = token.ExpiredDate });
            response.Cookies.Append("user", username);
        }

        private void DeleteCookie()
        {
            var response = HttpContext.Response;
            response.Cookies.Delete("token");
            response.Cookies.Delete("user");
        }
    }
}
