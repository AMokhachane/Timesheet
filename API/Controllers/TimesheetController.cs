using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Timesheet;
using API.Interfaces;
using API.Mappers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/timesheet")]
    [ApiController]
    public class TimesheetController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITimesheetRepository _timesheetRepo;
        private readonly UserManager<AppUser> _userManager;

        public TimesheetController(
            ApplicationDBContext context,
            ITimesheetRepository timesheetRepo,
            UserManager<AppUser> userManager)
        {
            _context = context;
            _timesheetRepo = timesheetRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var timesheets = await _timesheetRepo.GetAllAsync();

            var timesheetDto = timesheets.Select(s => s.ToTimesheetDto());

            return Ok(timesheetDto);
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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTimesheetRequestDto timesheetDto)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();

            var timesheetModel = timesheetDto.ToTimesheetFromCreateDTO();

            // Assign the submitting user's ID to the timesheet
            timesheetModel.UserId = user.Id;

            await _timesheetRepo.CreateAsync(timesheetModel);

            return CreatedAtAction(nameof(GetById), new { id = timesheetModel.Id }, timesheetModel.ToTimesheetDto());
        }

        [Authorize(Roles = "Admin")]
[HttpGet("user/{userId}")]
public async Task<IActionResult> GetByUserId([FromRoute] string userId)
{
    var timesheets = await _timesheetRepo.GetByUserIdAsync(userId);

    if (timesheets == null || !timesheets.Any())
    {
        return NotFound($"No timesheets found for user ID: {userId}");
    }

    var timesheetDtos = timesheets.Select(t => t.ToTimesheetDto());

    return Ok(timesheetDtos);
}

    }
}
