using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface ITimesheetRepository
    {
        Task<List<Timesheet>> GetAllAsync();
        Task<Timesheet?> GetByIdAsync(int id);
        Task<Timesheet> CreateAsync(Timesheet timesheetModel);
    }
}