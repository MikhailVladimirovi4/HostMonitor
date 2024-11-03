namespace HM.API.Models.Dto
{
    public record LocalUserDto(
        Guid Id,
        string UserName,
        string Name,
        string Role
    );
}
