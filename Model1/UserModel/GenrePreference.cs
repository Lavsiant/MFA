using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class GenrePreference
    {
        public int ID { get; set; }

        public Genre Genre { get; set; }

        public Preference Preference { get; set; }
    }
}
