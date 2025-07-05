export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=250&fit=crop",
    rating: 4.2,
    reviews: 89
  },
  {
    id: 3,
    name: "Designer T-Shirt",
    category: "clothing",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=250&fit=crop",
    rating: 4.7,
    reviews: 203
  },
  {
    id: 4,
    name: "Coffee Maker",
    category: "home",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=250&fit=crop",
    rating: 4.3,
    reviews: 156
  },
  {
    id: 5,
    name: "Programming Book",
    category: "books",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=250&fit=crop",
    rating: 4.8,
    reviews: 67
  },
  {
    id: 6,
    name: "Laptop",
    category: "electronics",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=250&fit=crop",
    rating: 4.6,
    reviews: 342
  },
  {
    id: 7,
    name: "Jeans",
    category: "clothing",
    price: 59.99,
    image: "data:image/jpeg;base64,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",
    rating: 4.4,
    reviews: 178
  },
  {
    id: 8,
    name: "Plant Pot",
    category: "home",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=250&fit=crop",
    rating: 4.1,
    reviews: 94
  },
  {
    id: 9,
    name: "Cookbook",
    category: "books",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=250&fit=crop",
    rating: 4.5,
    reviews: 112
  },
  {
    id: 10,
    name: "Smartphone",
    category: "electronics",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=250&fit=crop",
    rating: 4.7,
    reviews: 298
  },
  {
    id: 11,
    name: "Sweater",
    category: "clothing",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=250&fit=crop",
    rating: 4.3,
    reviews: 145
  },
  {
    id: 12,
    name: "Desk Lamp",
    category: "home",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=250&fit=crop",
    rating: 4.2,
    reviews: 87
  }
];