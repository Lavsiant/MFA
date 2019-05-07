using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.ViewModels.Song;

namespace WebApp.ViewModels.Playlist
{
    public class PlaylistViewModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public List<SongViewModel> Songs { get; set; }

        public int OwnerId { get; set; }
    }
}
