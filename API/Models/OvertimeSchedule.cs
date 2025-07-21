using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class OvertimeSchedule
    {
        public int Id { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }
        public decimal TotalHours => Math.Round((decimal)(EndTime - StartTime).TotalHours, 2);
        public string Description { get; set; } = string.Empty;
        public string ApprovalStatus { get; set; } = "Pending";
    }
}