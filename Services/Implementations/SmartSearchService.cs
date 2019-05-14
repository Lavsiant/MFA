using Model;
using Services.Interfaces;
using Services.Models.Common;
using Services.Models.Song;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementations
{
    public class SmartSearchService : ISmartSerachService
    {
        private readonly IIdentityService _identityService;
        private readonly IPlaylistService _playlistService;
        private readonly ISongService _songService;

        public SmartSearchService(
            IIdentityService identityService,
            IPlaylistService playlistService,
            ISongService songService)
        {
            _identityService = identityService;
            _playlistService = playlistService;
            _songService = songService;
        }

        public async Task<Playlist> LoadPlaylistWithSmartSearch(State state, int userId)
        {
            var user = await _identityService.GetFullUser(userId);

            var songs = await _songService.GetAllSongs();

            if (user.Preferences != null && user.Preferences.Count > 0)
            {
                var orderedGenrePreferences = user.Preferences.OrderByDescending(x => x.Preference).ToList();

                var orderedQuerry = songs.OrderBy(x => x.Genre == orderedGenrePreferences.First().Genre);
                for (int i = 1; i < orderedGenrePreferences.Count; i++)
                {
                    orderedQuerry = orderedQuerry.ThenBy(x => x.Genre == orderedGenrePreferences[i].Genre);
                }
                songs = orderedQuerry.ToList();
            }

            // var firstPrioritySongs = songs.W

            throw new NotImplementedException();

        }

        private List<Song> GetSongsBySearchPriority(List<Song> songs, State state, SmartSearchPriority smartSearchPriority)
        {
            switch (smartSearchPriority)
            {
                case SmartSearchPriority.High:
                    return songs.Where(x =>
                       x.State.Location == state.Location &&
                       x.State.Mood == state.Mood &&
                       x.State.Weather == state.Weather).ToList();
                case SmartSearchPriority.TopMedium:
                    return songs.Where(x =>
                        x.State.Mood == state.Mood &&
                        x.State.Weather == state.Weather).ToList();
                case SmartSearchPriority.Medium:
                    return songs.Where(x =>
                       x.State.Location == state.Location &&
                       x.State.Weather == state.Weather).ToList();
                case SmartSearchPriority.BotMedium:
                    return songs.Where(x =>
                      x.State.Location == state.Location &&
                      x.State.Mood == state.Mood &&
                      x.State.Weather == state.Weather).ToList();
                case SmartSearchPriority.Lowest:
                    return songs.Where(x =>
                      x.State.Location == state.Location &&
                      x.State.Mood == state.Mood &&
                      x.State.Weather == state.Weather).ToList();
                default:
                    return songs.ToList();
            }

        }


    }
}
