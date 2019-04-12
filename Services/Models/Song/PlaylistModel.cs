using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Models.Song
{
    public class PlaylistModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public List<Model.Song> Songs { get; set; }
    }
}
