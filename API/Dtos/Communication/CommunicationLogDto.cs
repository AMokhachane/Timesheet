using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Communication
{
    public class CommunicationLogDto
    {
        public int Id { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public int ClientId { get; set; }
        public string CommunicationMethod { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public bool FollowUpRequired { get; set; }
        public string? Username { get; set; }

    }
}