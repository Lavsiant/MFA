using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Models.Song
{
    public class PlaylistVM
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public List<SongVM> Songs { get; set; }
    }
}
