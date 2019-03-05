using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IAuthRepository
    {
        Task UpdateUserToken(int id, Token token);

        Task<Token> GetToken(string username);                
    }
}
