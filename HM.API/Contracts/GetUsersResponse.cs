using HM.API.Models.Dto;

namespace HM.API.Contracts
{
    public record GetUsersResponse(List<LocalUserDto> users);
}
