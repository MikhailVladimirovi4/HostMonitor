using HM.API.Models.Dto;

namespace HM.API.Contracts
{
    public record GetDevicesResponse(List<DeviceDto> devices);
}
