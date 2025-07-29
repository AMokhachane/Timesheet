using System;

namespace API.Models
{
    public class Timesheet
    {
        public int Id { get; set; }

        public DateTime UploadDate { get; set; } = DateTime.Now;

        public string ProjectName { get; set; } = string.Empty;

        public int ClientId { get; set; }

        public Client Client { get; set; }

        public string TaskDescription { get; set; } = string.Empty;

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public bool IsBillable { get; set; }

        public decimal TotalHours => Math.Round((decimal)(EndTime - StartTime).TotalHours, 2);

        public string? UserId { get; set; }  // nullable foreign key

        public AppUser? User { get; set; }   // navigation property nullable
    }
}
