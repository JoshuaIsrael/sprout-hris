using System.Threading.Tasks;
using System.Collections.Generic;
using Sprout.Exam.Business.DataTransferObjects;
using Sprout.Exam.WebApp.Models;

namespace Sprout.Exam.WebApp.Services.EmployeeService
{
    public interface IEmployeeService
    {
        public Task<ServiceResponse<bool>> AddEmployee(CreateEmployeeDto newEmployee);
        public Task<ServiceResponse<List<GetEmployeeDto>>> GetEmployees();
        public Task<ServiceResponse<GetEmployeeDto>> GetEmployeeById(int id);
        public Task<ServiceResponse<GetEmployeeDto>> UpdateEmployee(EditEmployeeDto employee);
        public Task<ServiceResponse<bool>> DeleteEmployee(int id);
        public Task<ServiceResponse<double>> CalculateSalary(int id, decimal absentDays, decimal workedDays);
    }
}