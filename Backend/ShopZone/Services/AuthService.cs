using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShopZone.DTOs;
using ShopZone.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ShopZone.Data;

namespace ShopZone.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;

        public AuthService(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return null;

            // Check if user is active (you can add IsActive property to ApplicationUser)
            // if (!user.IsActive) return null;

            var accessToken = await GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            // Update user with refresh token
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            user.LastLogin = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();

            return new AuthResponseDto
            {
                Token = accessToken,
                RefreshToken = refreshToken,
                Email = user.Email,
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? ""
            };
        }

        public async Task<ApiResponse> RegisterAsync(RegisterDto registerDto)
        {
            var existingUser = await _dbContext.User.FirstOrDefaultAsync(u => u.Email == registerDto.Email);

            if (existingUser != null)
            {
                return new ApiResponse
                {
                    Success = false,
                    Message = "Email is already registered."
                };
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);
            var refreshToken = GenerateRefreshToken();

            var user = new ApplicationUser
            {
                Email = registerDto.Email,
                PasswordHash = hashedPassword,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                CreatedAt = DateTime.UtcNow,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7),
                IsActive = true // Add this property to ApplicationUser
            };

            _dbContext.User.Add(user);
            await _dbContext.SaveChangesAsync();

            var token = await GenerateJwtToken(user);

            var data = new AuthResponseDto
            {
                Token = token,
                RefreshToken = refreshToken,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            return new ApiResponse
            {
                Success = true,
                Message = "User registered successfully.",
                Data = data
            };
        }

        public async Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto refreshTokenDto)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u =>
                u.RefreshToken == refreshTokenDto.RefreshToken &&
                u.RefreshTokenExpiryTime > DateTime.UtcNow);

            if (user == null)
                return null;

            var newAccessToken = await GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _dbContext.SaveChangesAsync();

            return new AuthResponseDto
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
                Email = user.Email,
                FirstName = user.FirstName ?? "",
                LastName = user.LastName ?? ""
            };
        }

        public async Task<bool> LogoutAsync(string refreshToken)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null)
                return false;

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = DateTime.MinValue;

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u => u.Email == forgotPasswordDto.Email);

            if (user == null)
                return false;

            // Generate password reset token
            var resetToken = GeneratePasswordResetToken();

            user.PasswordResetToken = resetToken;
            user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1); // 1 hour expiry

            await _dbContext.SaveChangesAsync();

            // TODO: Send email with reset link
            // await _emailService.SendPasswordResetEmailAsync(user.Email, resetToken);

            return true;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u =>
                u.PasswordResetToken == resetPasswordDto.Token &&
                u.PasswordResetTokenExpiry > DateTime.UtcNow);

            if (user == null)
                return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.NewPassword);
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = DateTime.MinValue;

            await _dbContext.SaveChangesAsync();
            return true;
        }

        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email ?? ""),
                new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}".Trim())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15), // Short-lived access token
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private string GeneratePasswordResetToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}