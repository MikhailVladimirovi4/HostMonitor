using HM.API.Models.Dto;

namespace HM.API.Repository.IRepository
{
    public interface IDeviceRepository
    {
        Task<string> Create(CreateDeviceDto createDeviceDto, CancellationToken ct);
        Task<string> Delete(string ipAddress, CancellationToken ct);
        Task<List<DeviceDto>> Get(CancellationToken ct);
        Task<string> Update(string ipAddress, string title, string description, string note, CancellationToken ct);
    }
}