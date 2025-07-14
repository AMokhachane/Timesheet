using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Client
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string ContactPerson { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        // Optional: navigation property for reverse relation
        public ICollection<Timesheet>? Timesheets { get; set; }
    }
}
