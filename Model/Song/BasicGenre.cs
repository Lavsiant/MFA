using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.Song
{
    public class BasicGenre
    {
        public string Name { get; set; }

        [Key]
        public BasicGenreType Type { get; set; }

        public List<Genre> Genres { get; set; }
    }
}
