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

        public async Task<PlaylistVM> LoadPlaylistWithSmartSearch(State state, int userId, int maxCount, string playlistName)
        {
            try
            {
                var count = maxCount;
                var user = await _identityService.GetFullUser(userId);
                var songs = await _songService.GetAllSongs();

                if (user.Preferences != null && user.Preferences.Count > 0)
                {
                    var orderedGenrePreferences = user.Preferences.OrderByDescending(x => x.Preference).ToList();

                    var orderedQuerry = songs.OrderBy(x => x.Genre == orderedGenrePreferences.First().Genre).
                        ThenBy(x => x.Genre = orderedGenrePreferences[1].Genre).
                        ThenBy(x => x.Genre = orderedGenrePreferences[2].Genre).
                        ThenBy(x => x.Genre = orderedGenrePreferences[3].Genre).
                        ThenBy(x => x.Genre = orderedGenrePreferences[4].Genre);
                    //for (int i = 1; i < orderedGenrePreferences.Count; i++)
                    //{
                    //    //orderedQuerry = orderedQuerry.ThenBy(x => x.Genre == orderedGenrePreferences[i].Genre);
                    //}
                    try
                    {
                        songs = orderedQuerry.ToList();
                    }
                    catch (Exception e)
                    {
                    }
                }

                var result = new List<Song>();

                for (int i = 0; i <= 4; i++)
                {
                    var fPrioritySongs = GetSongsBySearchPriority(songs, state, (SmartSearchPriority)i).ToList();
                    count -= fPrioritySongs.Except(result).Count();
                    result.AddRange(fPrioritySongs.Except(result));
                    if (count <= 0)
                    {
                        break;
                    }
                }
                var playlist = new Playlist()
                {
                    Name = playlistName
                };
                playlist = await _playlistService.CreatePlaylistWithReturn(playlist, user.ID);

                foreach (var song in result)
                {
                    await _playlistService.AddSongToPlaylist(song.ID, playlist.ID);
                }

                var playlistToReturn = new PlaylistVM()
                {
                    Name = playlist.Name,
                    ID = playlist.ID,
                    Songs = new List<SongVM>()
                };

                foreach (var song in result.Take(maxCount).ToList())
                {
                    playlistToReturn.Songs.Add(new SongVM()
                    {
                        Name = song.Name,
                        Band = song.Band,
                        State = song.State,
                        Genre = song.Genre
                    });
                }


                return playlistToReturn;
            }
            catch(Exception e)
            {

            }
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
                      x.State.Mood == state.Mood ||
                      x.State.Weather == state.Weather).ToList();
                case SmartSearchPriority.Lowest:
                    return songs.Where(x =>
                      x.State.Location == state.Location ||
                      x.State.Mood == state.Mood ||
                      x.State.Weather == state.Weather).ToList();
                default:
                    return songs.ToList();
            }

        }


    }
}
