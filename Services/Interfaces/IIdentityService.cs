﻿using Microsoft.AspNetCore.Identity;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IIdentityService
    {
        Task<List<User>> GetAllUsers();

        Task<User> GetUser(string username);

        Task UpdateUser(User user);

        Task DeleteUser(int id);

        Task UpdateGenrePreferences(List<GenrePreference> genrePreferences, int userId);
    }
}
