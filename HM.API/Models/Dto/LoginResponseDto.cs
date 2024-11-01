namespace HM.API.Models.Dto
{
    public record LoginResponseDto(LocalUser User, string Token);
}
