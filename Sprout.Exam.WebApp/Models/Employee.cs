namespace Sprout.Exam.WebApp.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Birthdate { get; set; } = string.Empty;
        public string TIN { get; set; } = string.Empty;
        public int EmployeeTypeId { get; set; } = 0;
        public bool IsDeleted { get; set; } = false;
    }
}