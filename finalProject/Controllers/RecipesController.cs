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
        [HttpPut]
        [Route("AddRecipe")]
        public JsonResult<ReturnObject> AddRecipe(RecipesEntities r)
        {
            System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
            if (headers.Contains("Authorization"))
            {
                r.Mail = headers.GetValues("Authorization").First();
            }
            else
            {
                return Json(new ReturnObject() { Status = false, Error = "Token is necessary" });
            }
            try
            {
                var rCode = RecipesBl.AddRecipe(r);
                SchedulesEntities s = new SchedulesEntities() { RecipeCode = rCode, Mail = r.Mail, RecipeTitle = r.RecipeTitle, RecipeImage = r.RecipeImage, RecipeDate = r.Date, SchedulingStatuse = r.SchedulingStatuse, Amount = 1, RecipeId = r.RecipeId };
                switch (r.SchedulingStatuse)
                {
                    //once
                    case 1:
                        s.Date = r.Date;
                        SchedulesBl.AddSchedules(s);
                        //SchedulesBl.AddSchedules(new SchedulesEntities() { RecipeCode = r.Code, Date = r.Date, Amount = 1 ,});
                        break;
                    //weekly
                    case 2:
                        for (int i = 0; i < 48; i++)
                        {
                            s.Date = r.Date.AddDays(i * 7);
                            SchedulesBl.AddSchedules(s);
                            //DateTime d = r.Date;
                            //SchedulesBl.AddSchedules(new SchedulesEntities() { RecipeCode = r.Code, Date = d.AddDays(i * 7), Amount = 1 });
                        }
                        break;
                    //monthly
                    case 3:
                        for (int i = 0; i < 12; i++)
                        {
                            s.Date = r.Date.AddMonths(i);
                            SchedulesBl.AddSchedules(s); 
                            //DateTime d = r.Date;
                            //SchedulesBl.AddSchedules(new SchedulesEntities() { RecipeCode = r.Code, Date = d.AddMonths(i), Amount = 1 });
                        }
                        break;
                    default:
                        return Json(new ReturnObject() { Status = false, Error = "error" });
                }
                if (!ProductsController.AddProducts(r.RecipeId, rCode))
                    return Json(new ReturnObject() { Status = false, Data = "AddProducts failed" });
                return Json(new ReturnObject() { Status = true, Data = r.Mail });
            }
            catch (Exception ex)
            {

                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
        }

        [HttpGet]
        [Route("SearchRecipe/{w}")]
        public JsonResult<ReturnObject> SearchRecipe(string w)
        {
            try
            {
                return Json(new ReturnObject() { Status = true, Data = ApiRecipes.SearchRecipe(w) });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetRecipeById/{id}")]
        public JsonResult<ReturnObject> GetRecipeById(string id)
        {
            try
            {
                return Json(new ReturnObject() { Status = true, Data = ApiRecipes.GetRecipeById(id) });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }
    }
}