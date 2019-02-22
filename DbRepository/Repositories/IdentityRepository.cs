using DbRepository.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
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
            using(var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Login == login);
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
    }
}
