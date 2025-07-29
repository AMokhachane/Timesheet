using API.Dtos.Communication;
using API.Models;

namespace API.Mappers
{
    public static class CommunicationLogMapper
    {
        public static CommunicationLogDto ToCommunicationLogDto(this CommunicationLog log)
        {
            return new CommunicationLogDto
            {
                Id = log.Id,
                UploadDate = log.UploadDate,
                ClientId = log.ClientId,
                CommunicationMethod = log.CommunicationMethod,
                Notes = log.Notes,
                FollowUpRequired = log.FollowUpRequired,
                // If you want to include the username:
                Username = log.User?.UserName ?? "Unknown"
            };
        }

        public static CommunicationLog ToCommunicationLogFromCreateDto(this CreateCommunicationLogRequestDto dto)
        {
            return new CommunicationLog
            {
                ClientId = dto.ClientId,
                CommunicationMethod = dto.CommunicationMethod,
                Notes = dto.Notes,
                FollowUpRequired = dto.FollowUpRequired,
                // UserId will be assigned in controller from the logged in user
            };
        }
    }
}
