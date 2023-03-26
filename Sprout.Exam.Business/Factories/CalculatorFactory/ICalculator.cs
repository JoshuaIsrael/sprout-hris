using Sprout.Exam.Business.DataTransferObjects;

namespace Sprout.Exam.Business.Factories.CalculatorFactory
{
    public interface ICalculator
    {
        decimal GetSalary(GetSalaryDto request);
    }
}