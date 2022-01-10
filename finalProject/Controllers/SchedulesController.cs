using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using BL;
using Entities;

namespace finalProject.Controllers
{
    [RoutePrefix("Api/Schedules")]
    public class SchedulesController : ApiController
    {
        [HttpGet]
        [Route("GetSchedulesByRange/{d1}/{d2}")]

        public JsonResult<ReturnObject> GetSchedulesByRange(DateTime d1, DateTime d2)
        {
            string mail = "";
            System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
            if (headers.Contains("Authorization"))
            {
                mail = headers.GetValues("Authorization").First();
            }
            else
            {
                return Json(new ReturnObject() { Status = false, Error = "Email is required!" });
            }
            try
            {
                var data = SchedulesEntities.ConvertToListEntities(SchedulesBl.GetSchedulesByRange(d1, d2, mail));
                return Json(new ReturnObject() { Status = true, Data = data });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
        }
    }
}