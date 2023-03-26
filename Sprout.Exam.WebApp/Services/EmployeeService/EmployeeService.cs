using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sprout.Exam.Business.DataTransferObjects;
using Sprout.Exam.WebApp.Data;
using Sprout.Exam.WebApp.Models;
using Sprout.Exam.Common.Enums;

namespace Sprout.Exam.WebApp.Services.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public EmployeeService(IMapper mapper, ApplicationDbContext context)
        {
            this._mapper = mapper;
            this._context = context;
        }

        public async Task<ServiceResponse<bool>> AddEmployee(CreateEmployeeDto newEmployee)
        {
            var response = new ServiceResponse<bool>();

            try
            {
                var employee = _context.Employees.Add(_mapper.Map<Employee>(newEmployee));
                await _context.SaveChangesAsync();
                response.Data = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<GetEmployeeDto>> GetEmployeeById(int id)
        {
            var response = new ServiceResponse<GetEmployeeDto>();

            try
            {
                var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);

                if (employee is null)
                    throw new Exception($"Employee with an ID of {id} not found.");

                response.Data = _mapper.Map<GetEmployeeDto>(employee);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<List<GetEmployeeDto>>> GetEmployees()
        {
            var response = new ServiceResponse<List<GetEmployeeDto>>();

            try
            {
                response.Data = await _context.Employees
                    .Where(e => !e.IsDeleted)
                    .Select(e =>
                        _mapper.Map<GetEmployeeDto>(e)
                    ).ToListAsync();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<GetEmployeeDto>> UpdateEmployee(EditEmployeeDto updatedEmployee)
        {
            var response = new ServiceResponse<GetEmployeeDto>();

            try
            {
                var employee = await _context.Employees
                    .FirstOrDefaultAsync(a => a.Id == updatedEmployee.Id);

                if (employee is null)
                    throw new Exception($"Employee with an id of {updatedEmployee.Id} is not found.");

                _mapper.Map(updatedEmployee, employee);

                await _context.SaveChangesAsync();
                response.Data = _mapper.Map<GetEmployeeDto>(employee);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<bool>> DeleteEmployee(int id)
        {
            var response = new ServiceResponse<bool>();

            try
            {
                var employee = await _context.Employees
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (employee is null)
                    throw new Exception($"Employee with an ID of {id} not found");

                employee.IsDeleted = true;
                await _context.SaveChangesAsync();
                response.Data = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponse<decimal>> CalculateSalary(GetSalaryDto request)
        {
            var response = new ServiceResponse<decimal>();

            try
            {
                var employee = await _context.Employees
                    .FirstOrDefaultAsync(e => e.Id == request.Id);

                if (employee is null)
                    throw new Exception($"Employee with an ID of {request.Id} not found");

                var type = (EmployeeType) employee.EmployeeTypeId;

                switch(type)
                {
                    case EmployeeType.Contractual:
                        response.Data = 500.0m * request.WorkedDays;
                        break;
                    case EmployeeType.Regular:
                        var grossSalary = 2000.0m;
                        var totalDeductions = request.AbsentDays * (grossSalary / 22.0m);
                        var totalTax = grossSalary * 0.12m;
                        response.Data = grossSalary - totalDeductions - totalTax;
                        break;
                    default:
                        response.Data = 0;
                        break;
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}