using System;
using System.Web.Http;
using System.Web.Http.Results;
using BL;
using Entities;

namespace finalProject.Controllers
{
    [RoutePrefix("Api/Clients")]
    public class ClientsController : ApiController
    {
        [HttpPut]
        [Route("AddClient")]
        public JsonResult<ReturnObject> AddClient(ClientsEntities c)
        {
            if (string.IsNullOrEmpty(c.Mail))
                return Json(new ReturnObject() { Status = false, Error = "Email is required" });
            if (string.IsNullOrEmpty(c.Password))
                return Json(new ReturnObject() { Status = false, Error = "Password is required" });
            if (ClientsBl.IsExist(c.Mail))
                return Json(new ReturnObject() { Status = false, Error = "User already exists" });
            try
            {
                ClientsBl.AddClient(c);
                return Json(new ReturnObject() { Status = true, Data = c.Mail });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }

        [HttpPost]
        [Route("Login")]
        public JsonResult<ReturnObject> Login(ClientsEntities c)
        {
            try
            {
                if (ClientsBl.Login(c.Mail, c.Password))
                    return Json(new ReturnObject() { Status = true, Data = c.Mail });
                return Json(new ReturnObject() { Status = false, Error = "User does not exists" });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }
    }
}