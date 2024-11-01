using HM.API.Data;
using HM.API.Models;
using HM.API.Models.Dto;
using HM.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HM.API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly HmDbContext _dbContext;
        private string _secretKey;

        public UserRepository(HmDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _secretKey = configuration.GetValue<string>("ApiSettings:Secret");
        }

        public bool IsUniqueUser(string username)
        {
            var user = _dbContext.LocalUsers.FirstOrDefault(u => u.UserName == username);

            if (user == null) { return true; }

            return false;
        }

        public async Task<LoginResponseDto?> Login(LoginRequestDto loginRequestDto, CancellationToken ct)
        {
            var user = await _dbContext.LocalUsers
                .FirstOrDefaultAsync(u => u.UserName.ToLower() == loginRequestDto.UserName.ToLower() && u.Password == loginRequestDto.Password);

            if (user == null)
            {
                return null;
            }
            else
            {

                //if user was found generation JWT Token

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secretKey);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name,user.Id.ToString()),
                    new Claim(ClaimTypes.Role,user.Role)
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                LoginResponseDto loginResponseDto = new LoginResponseDto()
                {
                    Token = tokenHandler.WriteToken(token),
                    User = user,
                };

                return loginResponseDto;
            }
        }


        public async Task<LocalUser> Register(RegistrationRequestDto registrationRequestDto, CancellationToken ct)
        {
            LocalUser user = new()
            {
                UserName = registrationRequestDto.UserName,
                Password = registrationRequestDto.Password,
                Name = registrationRequestDto.Name,
                Role = registrationRequestDto.Role,
            };

            await _dbContext.LocalUsers.AddAsync(user, ct);
            await _dbContext.SaveChangesAsync(ct);

            user.Password = "";

            return user;
        }
    }
}
