using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using BL;
using Entities;
namespace finalProject.Controllers
{
    [RoutePrefix("Api/Clients")]
    public class ClientsController : ApiController
    {
        //הוספה
        [HttpPut]
        [Route("AddClient")]
        public JsonResult<ReturnObject> AddClient(ClientsEntities c)
        {
            if (string.IsNullOrEmpty(c.Mail))
                return Json(new ReturnObject() { Status = false, Error = "Email is required!!", Data = "" });
            if (string.IsNullOrEmpty(c.Password))
                return Json(new ReturnObject() { Status = false, Error = "Password is required!!", Data = "" });
            if (ClientsBl.IsExist(c.Mail))
                return Json(new ReturnObject() { Status = false, Error = "User is exist!!", Data = "" });
            string error = "";
            try
            {
                ClientsBl.AddClient(c);
                return Json(new ReturnObject() { Status = true, Error = "", Data = c.Mail });
            }
            catch (Exception e)
            {
                error = e.Message;
            }
            return Json(new ReturnObject() { Status = false, Error = error, Data = "" });
        }
        ////בדיקה האם קיים לקוח לפי מייל
        //[HttpPost]
        //[Route("IsExist/{mail}")]
        //public bool IsExist(string mail)
        //{
        //    return ClientsBl.IsExist(mail);
        //}

        [HttpPost]
        [Route("Login")]
        public JsonResult<ReturnObject> Login(ClientsEntities c)
        {
            if (string.IsNullOrEmpty(c.Mail))
                return Json(new ReturnObject() { Status = false, Error = "Email is required!!", Data = "" });
            if (string.IsNullOrEmpty(c.Password))
                return Json(new ReturnObject() { Status = false, Error = "Password is required!!", Data = "" });
            if (ClientsBl.Login(c.Mail, c.Password))
                return Json(new ReturnObject() { Status = true, Error = "", Data = c.Mail });
            return Json(new ReturnObject() { Status = false, Error = "User does not exist!!", Data = "" });
        }
    }
}