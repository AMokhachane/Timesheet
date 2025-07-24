using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Client;
using API.Models;

namespace API.Mappers
{
    public static class ClientMappers
    {
        public static ClientDto ToClientDto(this Client clientModel)
        {
            return new ClientDto
            {
                Id = clientModel.Id,
                CompanyName = clientModel.CompanyName,
                FirstName = clientModel.FirstName,
                LastName = clientModel.LastName,
                IdNumber = clientModel.IdNumber,
                Email = clientModel.Email,
                PhoneNumber = clientModel.PhoneNumber,
                ClientAllocation = clientModel.ClientAllocation
            };
        }

        public static Client ToClientFromCreateDTO(this CreateClientRequestDto clientDto)
        {
            return new Client
            {
                CompanyName = clientDto.CompanyName,
                FirstName = clientDto.FirstName,
                LastName = clientDto.LastName,
                IdNumber = clientDto.IdNumber,
                Email = clientDto.Email,
                PhoneNumber = clientDto.PhoneNumber,
                ClientAllocation = clientDto.ClientAllocation

            };
        }
    }
}