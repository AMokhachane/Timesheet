using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Client;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/client")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IClientRepository _clientRepo;
        public ClientController(ApplicationDBContext context, IClientRepository clientRepo)
        {
            _clientRepo = clientRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _clientRepo.GetAllAsync();

            var clientDto = clients.Select(s => s.ToClientDto());

            return Ok(clients);
        }

        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var client = await _clientRepo.GetByIdAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client.ToClientDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateClientRequestDto clientDto)
        {
            var clientModel = clientDto.ToClientFromCreateDTO();
            await _clientRepo.CreateAsync(clientModel);
            return CreatedAtAction(nameof(GetById), new { id = clientModel.Id }, clientModel.ToClientDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateClientRequestDto updateDto)
        {
            var clientModel = await _clientRepo.UpdateAsync(id, updateDto);

            if (clientModel == null)
            {
                return NotFound();
            }

            return Ok(clientModel.ToClientDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var clientModel = await _clientRepo.DeleteAsync(id);
            if (clientModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}