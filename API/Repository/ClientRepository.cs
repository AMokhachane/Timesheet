using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Client;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly ApplicationDBContext _context;
        public ClientRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Client> CreateAsync(Client clientModel)
        {
            await _context.Clients.AddAsync(clientModel);
            await _context.SaveChangesAsync();
            return clientModel;
        }

        public async Task<Client?> DeleteAsync(int id)
        {
            var clientModel = await _context.Clients.FirstOrDefaultAsync(x => x.Id == id);
            if (clientModel == null)
            {
                return null;
            }

            _context.Clients.Remove(clientModel);
            await _context.SaveChangesAsync();
            return clientModel;
        }

        public async Task<List<Client>> GetAllAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client?> GetByIdAsync(int id)
        {
            return await _context.Clients.FindAsync(id);
        }

        public async Task<Client?> UpdateAsync(int id, UpdateClientRequestDto clientDto)
        {
            var existingClient = await _context.Clients.FirstOrDefaultAsync(x => x.Id == id);
            if (existingClient == null)
            {
                return null;
            }

            existingClient.Name = clientDto.Name;
            existingClient.ContactPerson = clientDto.ContactPerson;
            existingClient.Email = clientDto.Email;
            existingClient.PhoneNumber = clientDto.PhoneNumber;

            await _context.SaveChangesAsync();
            return existingClient;
        }
    }
}