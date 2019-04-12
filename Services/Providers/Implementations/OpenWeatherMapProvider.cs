using Newtonsoft.Json;
using Services.Models.Weather;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Services.Providers
{
    public class OpenWeatherMapProvider : IWeatherProvider
    {
        private const string _apiKey = "0b10715ad42b667699cafc77c8074cc9";
        private const string _baseUrl = "http://api.openweathermap.org/";


        public OpenWeatherMapProvider() { }

        public async Task<WeatherModel> GetWeatherByCoordinates(double latitude, double longitude)
        {
            var httpClient = new HttpClient
            {
                BaseAddress = new Uri(_baseUrl),                               
            };
            var response = await httpClient.GetAsync($"data/2.5/weather?lat={latitude}&lon={longitude}&appid={_apiKey}");
            var responseData = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());

            var weatherObj = (dynamic)((IEnumerable<dynamic>)responseData.weather).First();
            return new WeatherModel()
            {
                Id = weatherObj.id,
                Description = weatherObj.description,
                Main = weatherObj.main
            };

        }
    }
}
