namespace HM.API.Models.Dto
{
    public record RegistrationRequestDto(
        string UserName,
        string Name,
        string Password,
        string Role);
}
