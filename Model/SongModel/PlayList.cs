using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Playlist
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public List<PlaylistSong> PlaylistSongs { get; set; }

        public User Owner { get; set; }
    }
}
