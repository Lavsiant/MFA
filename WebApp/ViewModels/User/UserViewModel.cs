using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.ViewModels
{
    public class UserViewModel
    {
        public string login { get; set; }

        public string email { get; set; }

        public int id { get; set; }

        public string password { get; set; }

        public Role Role { get; set; }
    }
}
