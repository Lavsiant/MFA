using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using WebApp.Models.Enums;
using WebApp.Models.Exceptions;
using WebApp.Services.Interfaces;

namespace WebApp.Helpers
{
    internal class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly IAuthService _authService;
        private const string AuthorizationHeaderName = "token";
        private const string BasicSchemeName = "Basic";

        public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        IAuthService authService) : base(options, logger, encoder, clock)
        {
            _authService = authService;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Cookies.ContainsKey(AuthorizationHeaderName))
            {
                //Authorization header not in request
                return AuthenticateResult.NoResult();
            }
            string token = Request.Cookies["token"];
            string username = Request.Cookies["user"];
                        
            var checkResult = await _authService.CheckIfTokenValid(token, username);

            switch (checkResult)
            {
                case CheckTokenResult.InvalidToken:
                    throw new TypedException(ExceptionType.InvalidToken);                   
                case CheckTokenResult.TokenExpired:
                    throw new TypedException(ExceptionType.TokenExpired);
                case CheckTokenResult.Success:
                    var role = _authService.GetUserRole(username);
                    var claims = new[] { new Claim(ClaimTypes.Name, username) };
                    var identity = new ClaimsIdentity(claims, Scheme.Name,Scheme.Name,role.ToString());
                    var principal = new ClaimsPrincipal(identity);                    
                    var ticket = new AuthenticationTicket(principal, Scheme.Name);                    
                    return AuthenticateResult.Success(ticket);
                default: 
                    return AuthenticateResult.Fail("Server error"); 
            }
        }

    }
}
