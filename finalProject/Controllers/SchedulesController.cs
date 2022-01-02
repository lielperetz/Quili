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
        [Route("GetSchedulesByRange")]

        public Object GetSchedulesByRange(DateTime d1, DateTime d2)
        {
            object l = new object();
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
                l = SchedulesEntities.ConvertToListEntities(SchedulesBl.GetSchedulesByRange(d1, d2, mail));
            }
            catch (Exception ex)
            {
                l=Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
            return l;
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