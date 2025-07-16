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
            return await _context.Timesheets.ToListAsync();
        }

        public async Task<Timesheet?> GetByIdAsync(int id)
        {
            return await _context.Timesheets.FindAsync(id);
        }
    }
}