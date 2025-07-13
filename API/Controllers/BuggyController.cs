using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            return NotFound("This resource was not found");
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("unauthorized")]
        public ActionResult<string> GetUnauthorized()
        {
            return Unauthorized("You are not authorized to access this resource");
        }

        [HttpGet("validation-error")]
        public ActionResult<string> GetValidationError()
        {
            ModelState.AddModelError("ValidationError1", "This is a validation error");
            ModelState.AddModelError("ValidationError2", "This is a validation error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}
