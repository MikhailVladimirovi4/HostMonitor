using HM.API.Models;
using HM.API.Models.Dto;

namespace HM.API.Repository.IRepository
{
    public interface IUserRepository
    {
        bool IsUniqueUser (string username);
        Task<LoginResponseDto?> Login(LoginRequestDto loginRequestDto, CancellationToken ct);
        Task<LocalUser> Register(RegistrationRequestDto registrationRequestDto, CancellationToken ct);
    }
}
