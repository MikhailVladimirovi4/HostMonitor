namespace HM.API.Models.Dto
{
    public record DeviceDto(
        Guid Id,
        string IpAddress,
        string Title,
        string Description,
        string Note,
        DateTime CreatedAt
    );
}
