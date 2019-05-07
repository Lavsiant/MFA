using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class User 
    {
        public User()
        {
            Playlists = new List<Playlist>();
        }

        public int ID { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public Token Token { get; set; }

        public Role Role { get; set; }

        public State State { get; set; }

        public List<GenrePreference> Preferences { get; set; }

        public List<Playlist> Playlists { get; set; }
    }
}
