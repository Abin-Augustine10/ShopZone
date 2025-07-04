using ShopZone.DTOs;
using ShopZone.Models;

namespace ShopZone.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto);
        Task<string> GenerateJwtToken(ApplicationUser user);
    }
}
