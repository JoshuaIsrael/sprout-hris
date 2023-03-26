using Sprout.Exam.Business.DataTransferObjects;

namespace Sprout.Exam.Business.Factories.CalculatorFactory
{
    public class RegularCalculator : ICalculator
    {
        public decimal GetSalary(GetSalaryDto request)
        {
            var grossSalary = 2000.0m;
            var totalDeductions = request.AbsentDays * (grossSalary / 22.0m);
            var totalTax = grossSalary * 0.12m;
            return grossSalary - totalDeductions - totalTax;
        }
    }
}