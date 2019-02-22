using Microsoft.AspNetCore.Identity;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<List<User>> GetAllUsers();

        Task<User> GetUser(string login);

        Task<User> GetUserByLoginPassword(string login, string password);

        Task CreateUser(User user);
    }
}
