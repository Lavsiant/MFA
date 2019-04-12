using DbRepository.Interfaces;
using Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model;

namespace Services.Implementations
{
    public class IdentityService : IIdentityService
    {
        private readonly IIdentityRepository _identityRepository;

        public IdentityService(IIdentityRepository identityRepository)
        {
            _identityRepository = identityRepository;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _identityRepository.GetAllUsers();
        }

        public async Task<User> GetUser(string username)
        {
            return await _identityRepository.GetUser(username);
        }
    }
}
