using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoT.ViewModels
{
    class PlaylistVm
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public List<SongVM> Songs { get; set; }
    }
}
