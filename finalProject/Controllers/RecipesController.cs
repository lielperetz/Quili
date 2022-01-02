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
        private const string URL = "https://api.spoonacular.com/recipes/complexSearch";
        private string urlParameters = "?apiKey=52b9142911034ec3b82f8d31cb7410ca";

        [HttpGet]
        [Route("GetTry")]
        public JsonResult<ReturnObject> GetTry()
        {
            //List<JsonResult<ReturnObject>> res = new List<JsonResult<ReturnObject>>();
            string res = " ", error = " ";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            // List data response.
            HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call! Program will wait here until a response is received or a timeout occurs.
            if (response.IsSuccessStatusCode)
            {
                // Parse the response body.
                var dataObjects = response.Content.ReadAsAsync<JSON[]>().Result;  //Make sure to add a reference to System.Net.Http.Formatting.dll
                foreach (var d in dataObjects)
                {
                    res += d;
                    //res.Add(d);
                }
            }
            else
            {
                error = "err";
                //Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                //res.Add(Json(new ReturnObject() { Status = false, Error = "error", Data = "" }));
            }

            // Make any other calls using HttpClient here.

            // Dispose once all HttpClient calls are complete. This is not necessary if the containing object will be disposed of; for example in this case the HttpClient instance will be disposed automatically when the application terminates so the following call is superfluous.
            client.Dispose();
            return Json(new ReturnObject() { Status = false, Error = error, Data = res });
        }

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