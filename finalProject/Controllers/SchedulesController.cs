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

        [HttpGet]
        [Route("GetProductsByRange/{d1}/{d2}")]
        public JsonResult<ReturnObject> GetProductsByRange(DateTime d1, DateTime d2)
        {
            string mail = "";
            System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
            if (headers.Contains("Authorization"))
            {
                mail = headers.GetValues("Authorization").First();
            }
            else
            {
                //return Json(new ReturnObject() { Status = false, Error = "Email is required!" });
                mail = "hr1020ilove@gmail.com";
            }
            try
            {
                List<SchedulesEntities> Schedules = SchedulesEntities.ConvertToListEntities(SchedulesBl.GetSchedulesByRange(d1, d2, mail));
                List<ProductsEntities> data = new List<ProductsEntities>();
                bool flag = false;
                foreach (var s in Schedules)
                {
                    foreach (var p in ProductsController.GetRecipeProducts(s.RecipeCode))
                    {
                        flag = false;
                        for(int i = 0; i < data.Count; i++) {
                            if (data[i].ProductName == p.ProductName)
                            {
                                if (data[i].Unit == p.Unit)
                                {
                                    data[i].Amount += p.Amount;
                                    flag = true;
                                    break;
                                }
                                else {//המרה של נתונים
                                      }
                            }
                        }
                        if(!flag)
                            data.Add(p);
                    }
                }

                return Json(new ReturnObject() { Status = true, Data = data });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
        }

    }
}