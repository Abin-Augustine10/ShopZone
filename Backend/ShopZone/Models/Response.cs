namespace ShopZone.Models
{
    public class Response<T>
    {
        public bool Status { get; set; }
        public int Code { get; set; }
        public string? Message { get; set; }
        public List<T>? Data { get; set; } = new List<T>();
        public int? TotalRecords { get; set; } = 0;
    }

    public class ApiResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = "";
        public object? Data { get; set; }
    }

}
