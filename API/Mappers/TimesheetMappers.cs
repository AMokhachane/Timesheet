using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Timesheet;
using API.Models;

namespace API.Mappers
{
    public static class TimesheetMappers
    {
        public static TimesheetDto ToTimesheetDto(this Timesheet timesheetModel)
        {
            return new TimesheetDto
            {
                Id = timesheetModel.Id,
                UploadDate = timesheetModel.UploadDate,
                ProjectName = timesheetModel.ProjectName,
                ClientId = timesheetModel.ClientId,
                TaskDescription = timesheetModel.TaskDescription,
                StartTime = timesheetModel.StartTime,
                EndTime = timesheetModel.EndTime,
                IsBillable = timesheetModel.IsBillable
            };
        }

         public static Timesheet ToTimesheetFromCreateDTO(this CreateTimesheetRequestDto timesheetDto)
        {
            return new Timesheet
            {
                UploadDate = timesheetDto.UploadDate,
                ProjectName = timesheetDto.ProjectName,
                ClientId = timesheetDto.ClientId,
                TaskDescription = timesheetDto.TaskDescription,
                StartTime = timesheetDto.StartTime,
                EndTime = timesheetDto.EndTime,
                IsBillable = timesheetDto.IsBillable
            };
        }
    }
}