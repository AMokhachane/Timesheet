using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace API.Repository
{
    public class CommunicationLogRepository : ICommunicationLogRepository
    {
        private readonly ApplicationDBContext _context;

        public CommunicationLogRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<CommunicationLog>> GetAllAsync()
        {
            return await _context.CommunicationLogs
                .Include(c => c.Client)
                .Include(c => c.User)
                .ToListAsync();
        }

        public async Task<CommunicationLog> GetByIdAsync(int id)
        {
            return await _context.CommunicationLogs
                .Include(c => c.Client)
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<List<CommunicationLog>> GetByClientIdAsync(int clientId)
        {
            return await _context.CommunicationLogs
                .Where(c => c.ClientId == clientId)
                .Include(c => c.User)
                .Include(c => c.Client)
                .ToListAsync();
        }

        public async Task CreateAsync(CommunicationLog communicationLog)
        {
            _context.CommunicationLogs.Add(communicationLog);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CommunicationLog>> GetByUserIdAsync(string userId)
{
    return await _context.CommunicationLogs
        .Where(log => log.UserId == userId)
        .Include(log => log.Client)
        .Include(log => log.User)
        .OrderByDescending(log => log.UploadDate)
        .ToListAsync();
}

    }
}
