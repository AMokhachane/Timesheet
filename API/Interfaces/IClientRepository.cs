using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Client;
using API.Models;

namespace API.Interfaces
{
    public interface IClientRepository
    {
        Task<List<Client>> GetAllAsync();
        Task<Client?> GetByIdAsync(int id);
        Task<Client> CreateAsync(Client clientModel);
        Task<Client?> UpdateAsync(int id, UpdateClientRequestDto clientDto);
        Task<Client?> DeleteAsync(int id);
    }
}