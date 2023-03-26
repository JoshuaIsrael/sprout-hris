using Sprout.Exam.Common.Enums;

namespace Sprout.Exam.Business.Factories.CalculatorFactory
{
    public class CalculatorFactory
    {
        public static ICalculator CreateCalculator(EmployeeType employeeType)
        {
            ICalculator salaryCalculator = null;
        
            switch (employeeType)
            {
                case EmployeeType.Regular:
                    salaryCalculator = new RegularCalculator();
                    break;
                case EmployeeType.Contractual:
                    salaryCalculator = new ContractualCalculator();
                    break;
                default:
                    salaryCalculator = new RegularCalculator();
                    break;
            }

            return salaryCalculator;
        }
    }
}