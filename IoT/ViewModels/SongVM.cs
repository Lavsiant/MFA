using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoT.ViewModels
{
    public class SongVM
    {
        public string Name { get; set; }

        public string Band { get; set; }

        public Genre Genre { get; set; }

        public State State { get; set; }
    }
}
