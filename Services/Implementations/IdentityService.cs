using DbRepository.Interfaces;
using Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model;
using Services.Models.Common;
using System.Security.Cryptography;
using System.Text;

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

        public async Task<User> UpdateUser(User updatedUser)
        {
            var user = await _identityRepository.GetUser(updatedUser.ID);
            var userWithName = await _identityRepository.GetUser(updatedUser.Login);
            if (user != null && userWithName== null)
            {
                updatedUser.Password = GetHash(updatedUser.Password);
                return await _identityRepository.UpdateUser(updatedUser);
            }
            else if(userWithName != null)
            {
                throw new TypedException(ExceptionType.BadRequest, "User with login already exists");
            }
            else
            {
                throw new TypedException(ExceptionType.BadRequest,"User does not exists");
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

        public async Task UpdateGenrePreferences(List<GenrePreference> genrePreferences, string username)
        {
            var user = await _identityRepository.GetUser(username);
            if (user != null)
            {
                await _identityRepository.UpdateGenrePreferences(genrePreferences,user.ID);
            }
            else
            {
                throw new TypedException(ExceptionType.BadRequest, "User does not exist");
            }
        }

        public async Task<List<GenrePreference>> GetGenrePreferences(string username)
        {
            var user = await _identityRepository.GetUser(username);
            if (user != null)
            {
                return await _identityRepository.GetGenrePreferences(user.ID);
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

        public async Task<List<Playlist>> GetUserPlaylists(string username)
        {
            var user = await _identityRepository.GetFullUser(username);
            if (user != null)
            {
                return user.Playlists;
            }
            else
            {
                throw new TypedException(ExceptionType.BadRequest, "User does not exist");
            }
        }

        private string GetHash(string value)
        {
            using (SHA256 hash = SHA256Managed.Create())
            {
                return String.Concat(hash
                  .ComputeHash(Encoding.UTF8.GetBytes(value))
                  .Select(item => item.ToString("x2")));

            }
        }
    }
}
