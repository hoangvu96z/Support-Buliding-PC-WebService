using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BuildPC.Models;

namespace BuildPC
{
    public class Security
    {
        public static bool Login(string Username, string Password)
        {
            using (DOANCNEntities db = new DOANCNEntities())
            {
                return db.Users.Any(user => user.Username.Equals(Username, StringComparison.OrdinalIgnoreCase) && user.Password == Password);
            }
        }
    }
}