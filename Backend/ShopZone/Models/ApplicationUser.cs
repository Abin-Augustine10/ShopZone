using Microsoft.AspNetCore.Identity;

namespace ShopZone.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual Cart? Cart { get; set; }
    }
}
