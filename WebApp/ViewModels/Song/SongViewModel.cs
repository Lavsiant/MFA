using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.ViewModels.Song
{
    public class SongViewModel
    {
        public int id { get; set; }
        public string Name { get; set; }

        public string Band { get; set; }

        public Genre Genre { get; set; }

        public State State { get; set; }

        public string Url { get; set; }
    }
}
