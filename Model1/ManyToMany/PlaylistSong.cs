using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class PlaylistSong
    {
        public int PlaylistId { get; set; }
        public Playlist PlayList { get; set; }

        public int SongId { get; set; }
        public Song Song { get; set; }
    }
}
