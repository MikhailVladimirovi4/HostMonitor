namespace HM.API.Models.Dto
{
    public record CreateDeviceDto(
        string IpAddress,
        string Title,
        string Description
    );
}
