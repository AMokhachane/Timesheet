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
                Name = clientModel.Name,
                ContactPerson = clientModel.ContactPerson,
                Email = clientModel.Email,
                PhoneNumber = clientModel.PhoneNumber
            };
        } 
    }
}