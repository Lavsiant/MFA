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
using WebApp.Services.Interfaces;

namespace WebApp.Helpers
{
    internal class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly IAuthService _authService;
        private const string AuthorizationHeaderName = "Authorization";
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
            if (!Request.Headers.ContainsKey(AuthorizationHeaderName))
            {
                //Authorization header not in request
                return AuthenticateResult.NoResult();
            }
            string authorizationHeader = Request.Headers[AuthorizationHeaderName];
            var headerParts = authorizationHeader.Split(':');
            if (headerParts.Length != 2)
            {
                return AuthenticateResult.Fail("Invalid Basic authentication header");
            }
            var token = headerParts[0];
            var username = headerParts[1];
            var checkResult = await _authService.CheckIfTokenValid(token, username);

            switch (checkResult)
            {
                case CheckTokenResult.InvalidToken:
                    return AuthenticateResult.Fail("Invalid token");
                case CheckTokenResult.TokenExpired:
                    return AuthenticateResult.Fail("Token expired");
                case CheckTokenResult.Success:
                    var claims = new[] { new Claim(ClaimTypes.Name, username) };
                    var identity = new ClaimsIdentity(claims, Scheme.Name);
                    var principal = new ClaimsPrincipal(identity);
                    var ticket = new AuthenticationTicket(principal, Scheme.Name);
                    return AuthenticateResult.Success(ticket);
                default: 
                    return AuthenticateResult.Fail("Server error"); 
            }
        }

    }
}
