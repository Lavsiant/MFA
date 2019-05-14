using DbRepository.Interfaces;
using Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model;
using Services.Models.Common;

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

        public async Task UpdateUser(User updatedUser)
        {
            var user = await _identityRepository.GetUser(updatedUser.ID);
            if (user != null)
            {
                await _identityRepository.UpdateUser(updatedUser);
            }
            else
            {
                throw new TypedException(ExceptionType.BadRequest,"User does not exist");
            }
        }

        public async Task DeleteUser(int id)
        {
            var user = await _identityRepository.GetUser(id);
            if(user != null)
            {
                await _identityRepository.DeleteUser(user);
            }
            else
            {
                throw new TypedException(ExceptionType.BadRequest, "User does not exist");
            }
        }

        public async Task UpdateGenrePreferences(List<GenrePreference> genrePreferences, int userId)
        {
            var user = await _identityRepository.GetUser(userId);
            if (user != null)
            {
                await _identityRepository.DeleteUser(user);
            }
            else
            {
                throw new TypedException(ExceptionType.BadRequest, "User does not exist");
            }
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _identityRepository.GetUser(id);
            return user ?? throw new TypedException(ExceptionType.BadRequest);
        }

        public async Task<User> GetFullUser(int id)
        {
            var user = await _identityRepository.GetFullUser(id);
            return user ?? throw new TypedException(ExceptionType.BadRequest);
        }
    }
}
