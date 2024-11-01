using HM.API.Data;
using HM.API.Models;
using HM.API.Models.Dto;
using HM.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace HM.API.Repository
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly HmDbContext _dbContext;

        public DeviceRepository(HmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<DeviceDto>> Get(CancellationToken ct)
        {
            var devices = await _dbContext.Devices
                .Select(d => new DeviceDto(d.Id, d.IpAddress, d.Title, d.Description, d.Note, d.CreatedAt))
                .ToListAsync(ct);

            return devices;
        }

        public async Task<string> Create(CreateDeviceDto createDeviceDto, CancellationToken ct)
        {
            string result;
            bool isIpAddressUse = false;

            foreach (Device d in _dbContext.Devices)
            {
                if (d.IpAddress == createDeviceDto.IpAddress)
                {
                    isIpAddressUse = true;
                    break;
                }
            };

            if (!isIpAddressUse)
            {
                Device device = new(createDeviceDto.IpAddress, createDeviceDto.Title, createDeviceDto.Description);

                await _dbContext.Devices.AddAsync(device, ct);
                await _dbContext.SaveChangesAsync(ct);

                result = "Устройство с ip адресом: " + createDeviceDto.IpAddress + " создано.";
            }
            else
            {
                result = "Error: в таблице имеется устройство с ip адресом: " + createDeviceDto.IpAddress + ".";
            }

            return result;
        }

        public async Task<string> Update(string ipAddress, string title, string description, string note, CancellationToken ct)
        {
            await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress)
                .ExecuteUpdateAsync(s => s
                .SetProperty(d => d.Title, d => title)
                .SetProperty(d => d.Description, d => description)
                .SetProperty(d => d.Note, note), ct);

            await _dbContext.SaveChangesAsync(ct);

            return "Данные устройтсва с ip-адресом: " + ipAddress + " изменены.";
        }

        public async Task<string> Delete(string ipAddress, CancellationToken ct)
        {
            await _dbContext.Devices
                .Where(d => d.IpAddress == ipAddress)
            .ExecuteDeleteAsync(ct);

            await _dbContext.SaveChangesAsync(ct);

            return "Запись " + ipAddress + " удалена.";
        }
    }
}
