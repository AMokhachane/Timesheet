using API.Models;

namespace API.Interfaces
{
    public interface ICommunicationLogRepository
    {
        Task<List<CommunicationLog>> GetAllAsync();
        Task<CommunicationLog?> GetByIdAsync(int id);
        Task<List<CommunicationLog>> GetByClientIdAsync(int clientId);
        Task CreateAsync(CommunicationLog log);
    }
}
