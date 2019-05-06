using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Models.Song
{
    public class SongModel
    {
        public string Name { get; set; }

        public string Band { get; set; }

        public Genre Genre { get; set; }

        public State State { get; set; }
    }
}
