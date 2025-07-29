using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class TimesheetRepository : ITimesheetRepository
    {
        private readonly ApplicationDBContext _context;

        public TimesheetRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Timesheet> CreateAsync(Timesheet timesheetModel)
        {
            await _context.Timesheets.AddAsync(timesheetModel);
            await _context.SaveChangesAsync();
            return timesheetModel;
        }

        public async Task<List<Timesheet>> GetAllAsync()
        {
            return await _context.Timesheets
                .Include(t => t.Client)
                .Include(t => t.User)
                .OrderByDescending(t => t.UploadDate)
                .ToListAsync();
        }

        public async Task<Timesheet?> GetByIdAsync(int id)
        {
            return await _context.Timesheets
                .Include(t => t.Client)
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<Timesheet>> GetByUserIdAsync(string userId)
        {
            return await _context.Timesheets
                .Where(t => t.UserId == userId)
                .Include(t => t.Client)
                .Include(t => t.User)
                .OrderByDescending(t => t.UploadDate)
                .ToListAsync();
        }
    }
}
