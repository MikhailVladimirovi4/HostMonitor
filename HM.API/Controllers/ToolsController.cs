using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace HM.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToolsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> GetPing(string host, string waitTime)
        {
            string response = "offline";

            try
            {
                if (Int32.TryParse(waitTime, out int responseTime))
                {
                    Ping ping = new();
                    PingReply ResultPing = ping.Send(host, responseTime);
                    if (ResultPing.Status == IPStatus.Success)
                        response = "online";
                    else
                        response = "offline";
               
                }
                return  Ok(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Ok(response);
        }
    }
}
