using Services.Models.Weather;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Providers
{
    public interface IWeatherProvider
    {
        Task<WeatherModel> GetWeatherByCoordinates(double latitude, double longitude);
    }
}
