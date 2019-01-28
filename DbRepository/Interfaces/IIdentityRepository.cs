using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DbRepository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<List<IdentityUser>> GetAllUsers();

    }
}
