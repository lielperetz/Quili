using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Results;
using BL;
using Entities;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace finalProject.Controllers
{
    
    [RoutePrefix("Api/Recipes")]
    public class RecipesController : ApiController
    {

        [HttpGet]
        [Route("GetSavedRecipeById")]
        //public JsonResult<ReturnObject> GetSavedRecipeById(string id)
        //{
        //   return RecipesBl.
        //}

        [HttpPut]
        [Route("AddRecipe")]
        public JsonResult<ReturnObject> AddRecipe(RecipesEntities r)
        {
            //r.Mail
            System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
            if (headers.Contains("Token"))
            {
                r.Mail = headers.GetValues("Token").First();
            }
            else
            {
                return Json(new ReturnObject() { Status = false, Error = "Token is necessary"});
            }
            try
            {
                switch (r.SchedulingStatuse)
                {
                    //once
                    case 1:
                        RecipesBl.AddRecipe(r);
                        
                        SchedulesBl.AddSchedules(new SchedulesEntities() { RecipeCode = r.Code, Date = r.Date, Amount = 1 });
                        break;
                    //weekly
                    case 2:
                        RecipesBl.AddRecipe(r);
                        for (int i = 0; i < 48; i++)
                        {
                            DateTime d = r.Date;
                            SchedulesBl.AddSchedules(new SchedulesEntities() { RecipeCode = r.Code, Date = d.AddDays(i*7), Amount = 1 });
                        }
                        break;
                    case 3:
                        RecipesBl.AddRecipe(r);
                        for (int i = 0; i < 12; i++)
                        {
                            DateTime d = r.Date;
                            SchedulesBl.AddSchedules(new SchedulesEntities() { RecipeCode = r.Code, Date = d.AddMonths(i), Amount = 1 });
                        }
                        break;
                    default:
                        return Json(new ReturnObject() { Status = false, Error = "error" });
                }
            }
            catch(Exception ex)
            {
                
                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
            return Json(new ReturnObject() { Status = true, Data = r.Mail });
        }

        [HttpGet]
        [Route("GetRecipesByRange")]
        public JsonResult<ReturnObject> GetRecipesByRange()
        {
            return Json(new ReturnObject() { Status = false, Error = "", Data = "" });
        }
    }
}