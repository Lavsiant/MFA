using IoT.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace IoT.Providers
{
    class OpenWeatherMapProvider
    {
        private const string _apiKey = "c08c2832209676aa4770ed84f0ecb73d";
        private const string _baseUrl = "http://api.openweathermap.org/";


        public OpenWeatherMapProvider() { }

        public WeatherModel GetWeatherByCoordinates(double latitude, double longitude)
        {
            var httpClient = new HttpClient
            {
                BaseAddress = new Uri(_baseUrl),
            };
            var response =  httpClient.GetAsync($"data/2.5/weather?lat={latitude}&lon={longitude}&appid={_apiKey}").Result;
            var responseData = JsonConvert.DeserializeObject<dynamic>(response.Content.ReadAsStringAsync().Result);

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
