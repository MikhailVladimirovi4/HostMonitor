using HM.API.Contracts;
using HM.API.Models.Dto;
using HM.API.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HM.API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceRepository _devicesRepository;

        public DeviceController(IDeviceRepository devicesRepository)
        {
            _devicesRepository = devicesRepository;
        }

        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<GetDevicesResponse>>> Get(CancellationToken ct)
        {
            GetDevicesResponse response = new(await _devicesRepository.Get(ct));

            return Ok(response);
        }

        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateDeviceRequest request, CancellationToken ct)
        {
            return Ok(await _devicesRepository.Create(new CreateDeviceDto(request.IpAddress, request.Title, request.Description), ct));
        }

        [HttpPut]
        public async Task<ActionResult<string>> Update(string ipAddress, string title, string description, string note, CancellationToken ct)
        {
            Console.WriteLine(ipAddress, title, description, note);
            string result = await _devicesRepository.Update(ipAddress, title, description, note, ct);

            return Ok(result);
        }

        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpDelete]
        [Authorize]
        public async Task<ActionResult<string>> Delete(string ipAddress,CancellationToken ct)
        {
            string result = await _devicesRepository.Delete(ipAddress, ct);

            return Ok(result);
        }
    }
}
