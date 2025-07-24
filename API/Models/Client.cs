using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Client
    {
        public int Id { get; set; }

        public string CompanyName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string IdNumber { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;
        public string ClientAllocation { get; set; } = string.Empty;

        // Optional: navigation property for reverse relation
        public ICollection<Timesheet>? Timesheets { get; set; }
    }
}
