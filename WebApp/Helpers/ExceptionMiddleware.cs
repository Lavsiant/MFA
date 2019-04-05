using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Models.Exceptions;
using WebApp.Services.Implementations;
using WebApp.Services.Interfaces;

namespace WebApp.Helpers
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IExceptionService _exceptionService;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
            _exceptionService = new ExceptionService();
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (TypedException ex)
            {
                await HandleTypedExceptionAsync(context, ex);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleTypedExceptionAsync(HttpContext context, TypedException exception)
        {
            var response = context.Response;
            var statusCode = (int)HttpStatusCode.OK;      
            response.ContentType = "application/json";
            response.StatusCode = statusCode;
            var responseObj = _exceptionService.GetResponseByExceptionType(exception.Type);
            await response.WriteAsync(JsonConvert.SerializeObject(responseObj));
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            var statusCode = (int)HttpStatusCode.InternalServerError;
            response.ContentType = "application/json";
            response.StatusCode = statusCode;
            var responseObj = new Response()
            {
                StatusCode = HttpStatusCode.InternalServerError,
                Success = false,
                ErrorMessage = "Internal error",
            };
            await response.WriteAsync(JsonConvert.SerializeObject(responseObj));
        }
    }
}
