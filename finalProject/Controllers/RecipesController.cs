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
                r.Date = r.Date.ToLocalTime();
                RecipesBl.AddRecipe(r);
                var rCode = r.Code;
                SchedulesEntities s = new SchedulesEntities() { RecipeCode = rCode, Mail = r.Mail, RecipeTitle = r.RecipeTitle, RecipeImage = r.RecipeImage, RecipeDate = r.Date, SchedulingStatuse = r.SchedulingStatuse, Amount = 1, RecipeId = r.RecipeId };
                switch (r.SchedulingStatuse)
                {
                    //once
                    case 1:
                        s.Date = r.Date;
                        SchedulesBl.AddSchedules(s);
                        break;
                    //weekly
                    case 2:
                        for (int i = 0; i < 48; i++)
                        {
                            s.Date = r.Date.AddDays(i * 7);
                            SchedulesBl.AddSchedules(s);
                        }
                        break;
                    //monthly
                    case 3:
                        for (int i = 0; i < 12; i++)
                        {
                            s.Date = r.Date.AddMonths(i);
                            SchedulesBl.AddSchedules(s);
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
        [HttpGet]
        [Route("GetSavedRecipe")]
        public JsonResult<ReturnObject> GetSavedRecipe()
        {
            string mail = "";
            System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
            if (headers.Contains("Authorization"))
            {
                mail = headers.GetValues("Authorization").First();
            }
            else
            {
                return Json(new ReturnObject() { Status = false, Error = "Email is required" });
            }
            try
            {
                return Json(new ReturnObject() { Status = true, Data = RecipesBl.GetSavedRecipe(mail) });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }
        [HttpGet]
        [Route("GetRecipeByLocalId/{id}")]
        public JsonResult<ReturnObject> GetRecipeByLocalId(short id)
        {
            try
            {
                var d = RecipesBl.GetRecipeByLocalId(id);
                return Json(new ReturnObject() { Status = true, Data = d });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }
        [HttpGet]
        [Route("GetRandom")]
        public JsonResult<ReturnObject> GetRandom()
        {
            try
            {
                return Json(new ReturnObject() { Status = true, Data = ApiRecipes.GetRandom() });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }
    }
}