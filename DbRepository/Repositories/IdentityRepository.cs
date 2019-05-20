using DbRepository.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Repositories
{
    public class IdentityRepository : BaseRepository, IIdentityRepository
    {
        public IdentityRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<List<User>> GetAllUsers()
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.ToListAsync();
            }
        }

        public async Task<User> GetUser(string login)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Login == login);
            }
        }

        public async Task<User> GetUser(int id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(x => x.ID == id);
            }
        }

        public async Task<User> GetUserByLoginPassword(string login, string password)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Login.Equals(login) && x.Password.Equals(password));
            }
        }

        public async Task CreateUser(User user)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Users.Add(user);
                await context.SaveChangesAsync();
            }
        }

        public async Task<User> GetUserByLoginOrEmail(string login, string email)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Login.Equals(login) || x.Email.Equals(email));
            }
        }

        public async Task<User> GetFullUser(string login)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.Include(x => x.Playlists).Include(x => x.Preferences).FirstOrDefaultAsync(x => x.Login == login);
            }
        }

        public async Task<User> GetFullUser(int id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.Include(x => x.Playlists).Include(x => x.Preferences).FirstOrDefaultAsync(x => x.ID == id);
            }
        }

        public async Task<User> UpdateUser(User user)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var userToUpdate = await context.Users.FirstOrDefaultAsync(x => x.ID == user.ID);
                userToUpdate.Login = user.Login;
                userToUpdate.Email = user.Email;
                userToUpdate.Password = user.Password;
                await context.SaveChangesAsync();
                return userToUpdate;
            }
        }

        public async Task DeleteUser(User user)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Users.Remove(user);
                await context.SaveChangesAsync();
            }
        }

        public async Task UpdateGenrePreferences(List<GenrePreference> genrePreferences, int userId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                try
                {
                    var user = context.Users.Include(x => x.Preferences).FirstOrDefault(x => x.ID == userId);
                    user.Preferences = genrePreferences;
                    await context.SaveChangesAsync();
                }
                catch (Exception e)
                {

                }
            }
        }
        public async Task<List<GenrePreference>> GetGenrePreferences(int id)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var user = await context.Users.Include(x => x.Preferences).FirstOrDefaultAsync(x => x.ID == id);
                if (user != null)
                {
                    return user.Preferences;
                }
                else
                {
                    return null;
                }
            }
        }

    }
}
