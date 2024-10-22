namespace HM.API.Models.Dto
{
    public record DeviceDto(
        string IpAddress,
        string Title,
        string Description,
        string Note,
        DateTime CreatedAt
    );
}
