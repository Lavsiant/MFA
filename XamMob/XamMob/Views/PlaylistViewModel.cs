using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace XamMob.Views
{
    public class PlaylistViewModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public List<SongViewModel> Songs { get; set; }

        public int OwnerId { get; set; }
    }

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
