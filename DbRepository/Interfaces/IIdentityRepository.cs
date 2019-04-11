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

        Task<User> GetUser(int id);

        Task<User> GetFullUser(string login);

        Task<User> GetFullUser(int login);

        Task<User> GetUserByLoginPassword(string login, string password);

        Task<User> GetUserByLoginOrEmail(string login, string email);

        Task CreateUser(User user);
    }
}
