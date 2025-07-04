﻿namespace ShopZone.DTOs
{
    public class CartDto
    {
        public int Id { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new();
        public decimal TotalAmount { get; set; }
    }

    public class CartItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ProductImage { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Total => Price * Quantity;
    }

    public class AddToCartDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    public class UpdateCartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
