using DbRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Repositories
{
    public class AuthRepository : BaseRepository, IAuthRepository
    {
        public AuthRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task UpdateUserToken(int id, Token token)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var user = await context.Users.Include(x => x.Token).FirstOrDefaultAsync(x => x.ID == id);
                user.Token = token;
                await context.SaveChangesAsync();
            }
        }

        public async Task<Token> GetToken(string username)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var user = await context.Users.Include(x => x.Token).FirstOrDefaultAsync(x => x.Login == username);
                return user == null ? user.Token : null;                 
            }
        }

        public async Task<Role> GetUserRole(string username)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.Login.Equals(username));
                return user == null ? user.Role : Role.Default;
            }
        }
    }
}
