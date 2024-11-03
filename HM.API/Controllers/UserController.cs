using HM.API.Contracts;
using HM.API.Models;
using HM.API.Models.Dto;
using HM.API.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace HM.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        protected APIResponse _response;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
            this._response = new();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto, CancellationToken ct)
        {
            var loginResponse = await _userRepository.Login(loginRequestDto, ct);

            if (loginResponse == null || string.IsNullOrEmpty(loginResponse.Token))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("ERROR: введенные значения некорректны.");
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = loginResponse;
            return Ok(_response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Rigester([FromBody] RegistrationRequestDto registrationRequestDto, CancellationToken ct)
        {
            bool ifUserNameUnique = _userRepository.IsUniqueUser(registrationRequestDto.UserName);

            if (!ifUserNameUnique)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("ERROR: имя пользователя занято.");
                return BadRequest(_response);
            }

            var user = await _userRepository.Register(registrationRequestDto, ct);

            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("ERROR: ошибка регистрации.");
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<GetUsersResponse>>> Get(CancellationToken ct)
        {
            GetUsersResponse response = new(await _userRepository.Get(ct));

            return Ok(response);
        }

        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpDelete]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<string>> Delete(string userName, CancellationToken ct)
        {
            string result = await _userRepository.Delete(userName, ct);

            return Ok(result);
        }
    }
}
