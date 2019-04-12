using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IWeatherSevice
    {
        Task<Weather> GetWeatherTypeByCoordinates(double lat, double lon);
    }
}
