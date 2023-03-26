namespace Sprout.Exam.WebApp.Models
{
    public class ServiceResponse<T>
    {
        public bool IsSuccess { get; set; } = true;
        public T Data { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}