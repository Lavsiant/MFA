using IoT.Providers;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoT.Services
{
    class WeatherService
    {
        private readonly OpenWeatherMapProvider _weatherProvider;
        private readonly Dictionary<int, Weather> _weatherIdsMap;

        public WeatherService()
        {
            _weatherProvider = new OpenWeatherMapProvider();
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

        public Weather GetWeatherTypeByCoordinates(double lat, double lon)
        {
            var weather =  _weatherProvider.GetWeatherByCoordinates(lat, lon);
            Weather result;
             _weatherIdsMap.TryGetValue(GetNormalizedWeatherCode(weather.Id),out result);
            return result;
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
