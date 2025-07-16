using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Timesheet;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/timesheet")]
    [ApiController]
    public class TimesheetController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITimesheetRepository _timesheetRepo;
        public TimesheetController(ApplicationDBContext context, ITimesheetRepository timesheetRepo)
        {
            _timesheetRepo = timesheetRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var timesheets = await _timesheetRepo.GetAllAsync();
        
            var timesheetDto = timesheets.Select(s => s.ToTimesheetDto());

            return Ok(timesheets);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var timesheet = await _timesheetRepo.GetByIdAsync(id);

            if (timesheet == null)
            {
                return NotFound();
            }

            return Ok(timesheet.ToTimesheetDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTimesheetRequestDto timesheetDto)
        {
            var timesheetModel = timesheetDto.ToTimesheetFromCreateDTO();
            await _timesheetRepo.CreateAsync(timesheetModel);
            return CreatedAtAction(nameof(GetById), new { id = timesheetModel.Id }, timesheetModel.ToTimesheetDto());
        }
    }
}