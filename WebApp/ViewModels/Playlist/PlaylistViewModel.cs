using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.ViewModels.Playlist
{
    public class PlaylistViewModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public List<Model.Song> Songs { get; set; }

        public int OwnerId { get; set; }
    }
}
