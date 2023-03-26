using Sprout.Exam.Business.DataTransferObjects;

namespace Sprout.Exam.Business.Factories.CalculatorFactory
{
    public class ContractualCalculator : ICalculator
    {
        public decimal GetSalary(GetSalaryDto request)
        {
            return 500.0m * request.WorkedDays;
        }
    }
}