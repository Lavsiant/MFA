using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.State
{
    class Mood
    {
        public string Name { get; set; }

        [Key]
        public MoodType Type { get; set; }
    }
}
