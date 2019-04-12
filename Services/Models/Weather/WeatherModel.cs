using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Models.Weather
{
    public class WeatherModel
    {
        public int Id { get; set; }

        public string Main { get; set; }

        public string Description { get; set; }
    }
}
