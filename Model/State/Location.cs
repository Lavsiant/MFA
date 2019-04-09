using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.State
{
    class Location
    {
        public string Name { get; set; }

        [Key]
        public LocationType Type { get; set; }
    }
}
