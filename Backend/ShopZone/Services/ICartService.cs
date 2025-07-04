using ShopZone.DTOs;

namespace ShopZone.Services
{
    public interface ICartService
    {
        Task<CartDto> GetCartAsync(string userId);
        Task<CartDto> AddToCartAsync(string userId, AddToCartDto addToCartDto);
        Task<CartDto> UpdateCartItemAsync(string userId, UpdateCartItemDto updateCartItemDto);
        Task<bool> RemoveFromCartAsync(string userId, int productId);
        Task<bool> ClearCartAsync(string userId);
    }
}
