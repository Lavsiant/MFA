using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Song
    {
        public Song()
        {
            PlaylistSongs = new List<PlaylistSong>();
        }

        public int ID { get; set; }

        public string Name { get; set; }

        public string Band { get; set; }

        public Genre Genre { get; set; }

        public State State { get; set; }

        public string Url { get; set; }

        public List<PlaylistSong> PlaylistSongs { get; set; }
    }
}
