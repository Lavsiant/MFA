using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoT.Services
{
    class MoodService
    {
        public Mood GetMoodByPulse(int pulse)
        {
            Mood mood = Mood.Undefined;
            if (pulse >= 60 && pulse <= 70)
            {
                mood = Mood.Sad;
            }
            if (pulse > 70 && pulse <= 80)
            {
                mood = Mood.Glad;
            }
            if (pulse > 80 && pulse <= 90)
            {
                mood = Mood.Inspired;
            }
            if (pulse > 90 && pulse <= 100)
            {
                mood = Mood.Enamored;
            }
            return mood;
        }
    }
}
