using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Account
{
    public class UserDto
    {
    public string Username  { get; set; }
        public string Email     { get; set; }
        public string FirstName { get; set; }
        public string LastName  { get; set; }
        public string Role      { get; set; }
    }
}