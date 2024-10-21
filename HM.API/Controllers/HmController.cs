using HM.API.Contracts;
using HM.API.Data;
using HM.API.Models;
using HM.API.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HM.API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class HmController : ControllerBase
    {
        private readonly HmDbContext _dbContext;

        public HmController(HmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get(CancellationToken ct)
        {
            var noteDto = await _dbContext.Devices
                .Select(x => new DeviceDto(x.Id, x.Title, x.Description, x.IpAddress, x.Note, x.CreatedAt)).ToListAsync();

            return Ok(new GetDevicesResponse(noteDto));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDeviceRequest request, CancellationToken ct)
        {
            var device = new Device(request.Title, request.Description, request.IpAddress);

            await _dbContext.Devices.AddAsync(device, ct);
            await _dbContext.SaveChangesAsync(ct);

            return Ok();
        }
    }
}
