using ShopZone.Models;

namespace ShopZone.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (context.Products.Any())
                return;

            var products = new List<Product>
            {
                new Product { Name = "Wireless Headphones", Category = "electronics", Price = 99.99m, Image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop", Rating = 4.5, Reviews = 128, Description = "High-quality wireless headphones with noise cancellation", Stock = 50 },
                new Product { Name = "Smart Watch", Category = "electronics", Price = 249.99m, Image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=250&fit=crop", Rating = 4.2, Reviews = 89, Description = "Feature-rich smartwatch with health tracking", Stock = 30 },
                new Product { Name = "Designer T-Shirt", Category = "clothing", Price = 29.99m, Image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=250&fit=crop", Rating = 4.7, Reviews = 203, Description = "Comfortable designer t-shirt made from premium cotton", Stock = 100 },
                new Product { Name = "Coffee Maker", Category = "home", Price = 79.99m, Image = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=250&fit=crop", Rating = 4.3, Reviews = 156, Description = "Programmable coffee maker with thermal carafe", Stock = 25 },
                new Product { Name = "Programming Book", Category = "books", Price = 39.99m, Image = "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=250&fit=crop", Rating = 4.8, Reviews = 67, Description = "Comprehensive guide to modern programming practices", Stock = 40 },
                new Product { Name = "Laptop", Category = "electronics", Price = 899.99m, Image = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=250&fit=crop", Rating = 4.6, Reviews = 342, Description = "High-performance laptop for work and gaming", Stock = 15 },
                new Product { Name = "Jeans", Category = "clothing", Price = 59.99m, Image = "https://images.unsplash.com/photo-1542323254-57a2-4b1e-a49e-8a0b3b7b7b7b?w=300&h=250&fit=crop", Rating = 4.4, Reviews = 178, Description = "Classic fit jeans made from durable denim", Stock = 75 },
                new Product { Name = "Plant Pot", Category = "home", Price = 24.99m, Image = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=250&fit=crop", Rating = 4.1, Reviews = 94, Description = "Decorative ceramic plant pot for indoor plants", Stock = 60 },
                new Product { Name = "Cookbook", Category = "books", Price = 19.99m, Image = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=250&fit=crop", Rating = 4.5, Reviews = 112, Description = "Collection of delicious recipes for home cooking", Stock = 35 },
                new Product { Name = "Smartphone", Category = "electronics", Price = 699.99m, Image = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=250&fit=crop", Rating = 4.7, Reviews = 298, Description = "Latest smartphone with advanced camera and features", Stock = 20 },
                new Product { Name = "Sweater", Category = "clothing", Price = 49.99m, Image = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=250&fit=crop", Rating = 4.3, Reviews = 145, Description = "Cozy wool sweater perfect for cold weather", Stock = 45 },
                new Product { Name = "Desk Lamp", Category = "home", Price = 34.99m, Image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=250&fit=crop", Rating = 4.2, Reviews = 87, Description = "Adjustable LED desk lamp with multiple brightness levels", Stock = 55 }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
