using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Services.Interfaces
{
    public interface IIdentityService
    {
        Task<List<IdentityUser>> GetAllUsers();
    }
}
