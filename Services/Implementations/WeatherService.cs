using Model;
using Services.Interfaces;
using Services.Providers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Implementations
{
    public class WeatherService : IWeatherSevice
    {
        private readonly IWeatherProvider _weatherProvider;
        private readonly Dictionary<int, Weather> _weatherIdsMap;

        public WeatherService(IWeatherProvider weatherProvider)
        {
            _weatherProvider = weatherProvider;
            _weatherIdsMap = new Dictionary<int, Weather>()
            {
                {200,Weather.ThunderStorm},
                {300,Weather.Drizzle},
                {500,Weather.Rain},
                {600,Weather.Snow},
                {800,Weather.Sunny},
                {802,Weather.Cloudy}
            };
        }

        public async Task<Weather> GetWeatherTypeByCoordinates(double lat, double lon)
        {
            var weather = await _weatherProvider.GetWeatherByCoordinates(lat, lon);
            return _weatherIdsMap.GetValueOrDefault(GetNormalizedWeatherCode(weather.Id));
        }

        private int GetNormalizedWeatherCode(int code)
        {
            char categoryIdentifier = code.ToString()[0];
            switch (categoryIdentifier)
            {
                case '2':
                    return 200;
                case '3':
                    return 300;
                case '5':
                    return 500;
                case '6':
                    return 600;
                case '8':
                    return code <= 801 ? 800 : 802;
                default:
                    return 800;
            }
        }
    }
}
