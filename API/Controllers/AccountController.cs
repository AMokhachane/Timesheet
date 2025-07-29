using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Account;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(
            UserManager<AppUser> userManager,
            ITokenService tokenService,
            SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
                return Unauthorized("Invalid Email!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Email or Password incorrect");

            return Ok(new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
{
    try
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var appUser = new AppUser
        {
            UserName = registerDto.Username,
            Email = registerDto.Email
        };

        var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

        if (!createdUser.Succeeded)
            return StatusCode(500, createdUser.Errors);

        // Validate role and assign default if invalid or missing
        var requestedRole = registerDto.Role?.Trim();

        string[] allowedRoles = new[] { "User", "Admin", "Supervisor" };
        if (string.IsNullOrEmpty(requestedRole) || !allowedRoles.Contains(requestedRole))
        {
            requestedRole = "User"; // fallback to User role
        }

        var roleResult = await _userManager.AddToRoleAsync(appUser, requestedRole);
        if (!roleResult.Succeeded)
            return StatusCode(500, roleResult.Errors);

        return Ok(new NewUserDto
        {
            UserName = appUser.UserName,
            Email = appUser.Email,
            Token = _tokenService.CreateToken(appUser) // We'll update this to include roles next
        });
    }
    catch (Exception e)
    {
        return StatusCode(500, e);
    }
}

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = _userManager.Users.ToList();

                var userDtos = users.Select(user => new
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Id = user.Id
                });

                return Ok(userDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while fetching users",
                    error = ex.Message
                });
            }
        }

        [Authorize]
[HttpGet("current-user")]
public async Task<ActionResult<UserDto>> GetCurrentUser()
{
    var email = User.FindFirstValue(ClaimTypes.Email);
    if (email == null)
        return Unauthorized("User email not found in token.");

    var user = await _userManager.FindByEmailAsync(email);
    if (user == null)
        return Unauthorized("User not found.");

    var roles = await _userManager.GetRolesAsync(user);

    return new UserDto
    {
        Username = user.UserName,
        Email = user.Email,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Role = roles.FirstOrDefault() // ✅ Get the first role (if any)
    };
}

    }
}
