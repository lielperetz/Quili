using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using BL;
using Entities;
namespace finalProject.Controllers
{
    [RoutePrefix("Api/Clients")]
    public class ClientsController: ApiController
    {
        //הוספה
        [HttpPut]
        [Route("AddClient")]
        public IHttpActionResult AddClient(ClientsEntities c)
        {
            try
            {
                ClientsBl.AddClient(c);
                return Ok(true);
            }
            catch
            {
                return Ok(false);
            }
        }
        //בדיקה האם קיים לקוח לפי מייל וסיסמא
        [HttpGet]
        [Route("IsExist/{mail}/{password}")]
        public IHttpActionResult IsExist(string mail, string password)
        {
            return Ok(ClientsBl.IsExist(mail, password));
        }
    }
}