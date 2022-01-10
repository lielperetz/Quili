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
            if (headers.Contains("Token"))
            {
                mail = headers.GetValues("Token").First();
            }
            else
            {
                return Json(new ReturnObject() { Status = false, Error = "Email is required!" });
            }
            try
            {
                var data = SchedulesEntities.ConvertToListEntities(SchedulesBl.GetSchedulesByRange(d1, d2, mail));
                Json(new ReturnObject() { Status = true, Data = data });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
            return Json(new ReturnObject() { Status = false, Error = "Unknown error" });
        }

        //public List<SchedulesEntities> GetSchedulesByRange(DateTime d1,DateTime d2)
        //{
        //    string mail = "";
        //    System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
        //    if (headers.Contains("Token"))
        //    {
        //        mail = headers.GetValues("Token").First();
        //    }
        //    //else
        //    //{
        //    //}
        //    //try
        //    //{
        //    //      return SchedulesEntities.ConvertToListEntities(SchedulesBl.GetSchedulesByRange(d1, d2, mail));
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    //list.Add(Json(new ReturnObject() { Status = false, Error = ex.ToString() }));
        //    //    //return list;
        //    //}
        //    return SchedulesEntities.ConvertToListEntities(SchedulesBl.GetSchedulesByRange(d1, d2, mail));
        //}


    }
}