using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class CommunicationLog
    {
        public int Id { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public int ClientId { get; set; }

        public Client Client { get; set; }
        public string CommunicationMethod { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public bool FollowUpRequired { get; set; }
    }
}