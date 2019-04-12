using AutoMapper;
using DbRepository.Factories;
using DbRepository.Interfaces;
using DbRepository.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Model;
using Services.Implementations;
using Services.Interfaces;
using Services.Models.Auth;
using Services.Models.Common;
using Services.Models.Song;
using Services.Providers;
using WebApp.Models;
using WebApp.ViewModels;
using WebApp.ViewModels.Playlist;
using WebApp.ViewModels.Song;

namespace WebApp.Helpers
{
    public static class ServerConfigurator
    {
        public static void InitializeMapper()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<User, UserViewModel>();
                cfg.CreateMap<LoginModel, LoginViewModel>();
                cfg.CreateMap<RegisterModel, RegisterViewModel>();
                cfg.CreateMap<PlaylistModel, PlaylistViewModel>();
                cfg.CreateMap<ErrorResponseModel, Response>();
                cfg.CreateMap<SongModel, SongViewModel>();
            });
        }

        public static void ConfigureRepositoryDI(IServiceCollection services, IConfiguration config)
        {
            var connectingString = config.GetConnectionString("DefaultConnection");
            services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
            services.AddScoped<IIdentityRepository>(provider => new IdentityRepository(config.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IAuthRepository>(provider => new AuthRepository(config.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<ISongRepository>(provider => new SongRepository(config.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IPlaylistRepository>(provider => new PlaylistRepository(config.GetConnectionString("DefaultConnection"), provider.GetService<IRepositoryContextFactory>()));            
        }

        public static void ConfigureServiceDI(IServiceCollection services)
        {
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddScoped<IExceptionService, ExceptionService>();
            services.AddScoped<ISongRepository, SongRepository>();
            services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            services.AddScoped<IWeatherSevice, WeatherService>();
            services.AddScoped<IWeatherProvider, OpenWeatherMapProvider>();
        }
    }
}
