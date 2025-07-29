using System.Security.Claims;
using API.Data;
using API.Dtos.Communication;
using API.Interfaces;
using API.Mappers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/communication")]
    [ApiController]
    public class CommunicationLogController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ICommunicationLogRepository _logRepo;
        private readonly UserManager<AppUser> _userManager;

        public CommunicationLogController(
            ApplicationDBContext context,
            ICommunicationLogRepository logRepo,
            UserManager<AppUser> userManager)
        {
            _context = context;
            _logRepo = logRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var logs = await _logRepo.GetAllAsync();
            var logDtos = logs.Select(log => log.ToCommunicationLogDto());
            return Ok(logDtos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var log = await _logRepo.GetByIdAsync(id);
            if (log == null) return NotFound();

            return Ok(log.ToCommunicationLogDto());
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCommunicationLogRequestDto dto)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return Unauthorized();

            var log = dto.ToCommunicationLogFromCreateDto();
            log.UserId = user.Id;

            await _logRepo.CreateAsync(log);

            return CreatedAtAction(nameof(GetById), new { id = log.Id }, log.ToCommunicationLogDto());
        }

        [Authorize]
        [HttpGet("client/{clientId:int}")]
        public async Task<IActionResult> GetByClientId([FromRoute] int clientId)
        {
            var logs = await _logRepo.GetByClientIdAsync(clientId);
            if (logs == null || !logs.Any())
                return NotFound($"No communication logs found for client ID: {clientId}");

            var logDtos = logs.Select(l => l.ToCommunicationLogDto());
            return Ok(logDtos);
        }

        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        {
            var logs = await _logRepo.GetByUserIdAsync(userId);
            if (logs == null || !logs.Any())
                return NotFound($"No communication logs found for user ID: {userId}");

            var logDtos = logs.Select(log => log.ToCommunicationLogDto());
            return Ok(logDtos);
        }
    }
}
