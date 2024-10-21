namespace HM.API.Models.Dto
{
    public record DeviceDto(
         Guid Id,
         string Title,
         string Description,
         string IpAddress,
         string Note,
         DateTime CreatedAt
    );
}
