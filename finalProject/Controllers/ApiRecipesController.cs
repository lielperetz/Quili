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
    
    [RoutePrefix("Api/ApiRecipes")]
    public class ApiRecipesController : ApiController
    {
        private const string URL = "https://api.spoonacular.com/recipes";
        private string urlParameters = "?apiKey=52b9142911034ec3b82f8d31cb7410ca";

        [HttpGet]
        [Route("SearchRecipe/{w}")]
        public JsonResult<ReturnObject> SearchRecipe(string w)
        {
            HttpClient client = new HttpClient();
            urlParameters += "&query=" + w;
            client.BaseAddress = new Uri( URL+ "/complexSearch");

            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;

            try
            {
                var dataObjects = response.Content.ReadAsAsync<Object>().Result;
                return Json(new ReturnObject() { Status = true, Data = dataObjects }); ;
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetRecipe/{id}")]
        public JsonResult<ReturnObject> GetRecipe(string id)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL + "/" + id + "/information");

            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;

            try
            {
                var dataObjects = response.Content.ReadAsAsync<Object>().Result;
                return Json(new ReturnObject() { Status = true, Data = dataObjects });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }
    }
}