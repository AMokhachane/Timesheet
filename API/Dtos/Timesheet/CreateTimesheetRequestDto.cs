using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Timesheet
{
    public class CreateTimesheetRequestDto
    {
        public DateTime UploadDate { get; set; } = DateTime.Now;

        public string ProjectName { get; set; } = string.Empty;

        public int ClientId { get; set; }

        public string TaskDescription { get; set; } = string.Empty;

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public bool IsBillable { get; set; }

        public decimal TotalHours => Math.Round((decimal)(EndTime - StartTime).TotalHours, 2);
    }
}