using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.State
{
    class Weather
    {
        public string Name { get; set; }

        [Key]
        public WeatherType Type { get; set; }
    }
}
