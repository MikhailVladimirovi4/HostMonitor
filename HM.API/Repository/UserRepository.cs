using HM.API.Data;
using HM.API.Models;
using HM.API.Models.Dto;
using HM.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace HM.API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly HmDbContext _dbContext;

        public UserRepository(HmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool IsUniqueUser(string username)
        {
            var user = _dbContext.LocalUsers.FirstOrDefault(u => u.UserName == username);

            if (user == null) { return true; }

            return false;
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto, CancellationToken ct)
        {
            throw new NotImplementedException();
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
