﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class State
    {
        public Location Location { get; set; }

        public Weather Weather { get; set; }

        public Mood Mood { get; set; }
    }
}
