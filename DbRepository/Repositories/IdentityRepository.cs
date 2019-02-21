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
                return await context.Users.FirstOrDefaultAsync(x => x.UserName == login);
            }
        }

    }
}
