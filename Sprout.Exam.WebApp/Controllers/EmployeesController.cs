using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Sprout.Exam.Business.DataTransferObjects;
using Sprout.Exam.Common.Enums;
using Sprout.Exam.WebApp.Services.EmployeeService;

namespace Sprout.Exam.WebApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }

        /// <summary>
        /// Refactor this method to go through proper layers and fetch from the DB.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            return Ok(await _employeeService.GetEmployees());
        }

        /// <summary>
        /// Refactor this method to go through proper layers and fetch from the DB.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(string id)
        {
            var result = await _employeeService.GetEmployeeById(int.Parse(id));
            return result.Data is null ? NotFound(result) : Ok(result);
        }

        /// <summary>
        /// Refactor this method to go through proper layers and update changes to the DB.
        /// </summary>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(EditEmployeeDto updatedEmployee)
        {
            var result = await _employeeService.UpdateEmployee(updatedEmployee);
            return result.Data is null ? BadRequest(result) : Ok(result);
        }

        /// <summary>
        /// Refactor this method to go through proper layers and insert employees to the DB.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddEmployee(CreateEmployeeDto newEmployee)
        {
            var result = await _employeeService.AddEmployee(newEmployee);
            return result.Data is false ? BadRequest(result) : Created("", result);
        }


        /// <summary>
        /// Refactor this method to go through proper layers and perform soft deletion of an employee to the DB.
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            var result = await _employeeService.DeleteEmployee(int.Parse(id));
            return result.Data is false ? BadRequest(result) : Ok(result);
        }



        /// <summary>
        /// Refactor this method to go through proper layers and use Factory pattern
        /// </summary>
        /// <param name="id"></param>
        /// <param name="absentDays"></param>
        /// <param name="workedDays"></param>
        /// <returns></returns>
        [HttpPost("{id}/calculate")]
        public async Task<IActionResult> Calculate(int id,decimal absentDays,decimal workedDays)
        {
            var result = await Task.FromResult(StaticEmployees.ResultList.FirstOrDefault(m => m.Id == id));

            if (result == null) return NotFound();
            var type = (EmployeeType) result.TypeId;
            return type switch
            {
                EmployeeType.Regular =>
                    //create computation for regular.
                    Ok(25000),
                EmployeeType.Contractual =>
                    //create computation for contractual.
                    Ok(20000),
                _ => NotFound("Employee Type not found")
            };

        }

    }
}
