using AutoMapper;
using Sprout.Exam.Business.DataTransferObjects;
using Sprout.Exam.WebApp.Models;

namespace Sprout.Exam.WebApp
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Employee, GetEmployeeDto>();
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<EditEmployeeDto, Employee>();
        }
    }
}