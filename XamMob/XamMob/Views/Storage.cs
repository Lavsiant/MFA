using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace XamMob.Views
{
    static class Storage
    {
        public static User User { get; set; }

        public static List<PlaylistViewModel> Playlists { get; set; }

        public static string Ip { get; set; }

        public static string Port { get; set; }
    }
}
