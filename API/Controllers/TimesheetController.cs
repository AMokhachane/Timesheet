using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/timesheet")]
    [ApiController]
    public class TimesheetController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public TimesheetController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var timesheets = _context.Timesheets.ToList()
            .Select(s => s.ToTimesheetDto());
            return Ok(timesheets);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var timesheet = _context.Timesheets.Find(id);

            if (timesheet == null)
            {
                return NotFound();
            }

            return Ok(timesheet.ToTimesheetDto());
        }
    }
}