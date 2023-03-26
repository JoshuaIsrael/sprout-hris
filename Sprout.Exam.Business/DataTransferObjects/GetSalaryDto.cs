namespace Sprout.Exam.Business.DataTransferObjects
{
  public class GetSalaryDto
    {
        public int Id { get; set; }
        public decimal AbsentDays { get; set; } = 0.0m;
        public decimal WorkedDays { get; set; } = 0.0m;
    }
}