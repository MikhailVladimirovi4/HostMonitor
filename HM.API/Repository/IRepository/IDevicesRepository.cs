using HM.API.Models;
using HM.API.Models.Dto;

namespace HM.API.Repository.IRepository
{
    public interface IDevicesRepository
    {
        Task<string> Create(CreateDeviceDto createDeviceDto, CancellationToken ct);
        Task<string> Delete(Guid id, string ipAddress, CancellationToken ct);
        Task<List<DeviceDto>> Get(CancellationToken ct);
        Task<string> Update(Guid id, string ipAddress, string title, string description, string note, CancellationToken ct);
    }
}