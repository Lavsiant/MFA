using DbRepository.Interfaces;
using MFA.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFA.Services.Implementations
{
    public class IdentityService : IIdentityService
    {
        private readonly IIdentityRepository _identityRepository;

        public IdentityService(IIdentityRepository identityRepository)
        {
            _identityRepository = identityRepository;
        }

        public async Task<List<IdentityUser>> GetAllUsers()
        {
            return await _identityRepository.GetAllUsers();
        }
    }
}
