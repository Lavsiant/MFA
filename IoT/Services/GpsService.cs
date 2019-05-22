using System;
using System.Collections.Generic;
using System.Device.Location;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoT.Services
{
    class Coordinates
    {
        public double Lat { get; set; }

        public double Long { get; set; }
    }

    class GpsService
    {
        const double defLat = 49;
        const double defLong = 36;
        public Coordinates GetCurrentCoordinates()
        {
            GeoCoordinateWatcher watcher = new GeoCoordinateWatcher(GeoPositionAccuracy.Default);
            watcher.Start(); //started watcher
            GeoCoordinate coord = watcher.Position.Location;
            if (!watcher.Position.Location.IsUnknown)
            {
                double lat = coord.Latitude; //latitude
                double longi = coord.Longitude;  //logitude
                return new Coordinates()
                {
                    Lat = lat,
                    Long = longi
                };
            }

            return new Coordinates()
            {
                Lat = defLat,
                Long = defLong
            };
        }
    }
}
