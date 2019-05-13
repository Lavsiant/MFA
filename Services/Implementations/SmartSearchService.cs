using Model;
using Services.Interfaces;
using System;
using System.Collections.Generic;
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
            var user = _identityService.GetUser(userId);
            throw new NotImplementedException();
        }
    }
}
