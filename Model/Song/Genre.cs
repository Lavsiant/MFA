using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.Song
{
    public class Genre
    {
        public string Name { get; set; }

        [Key]
        public GenreType Type { get; set; }

        public BasicGenre BasicGenre { get; set; }
    }
}
