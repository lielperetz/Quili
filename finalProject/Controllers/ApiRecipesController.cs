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
        [Route("SearchRecipe")]
        public object SearchRecipe(string w)
        {
            string error = " ";

            HttpClient client = new HttpClient();
            urlParameters += "&query=" + w;
            client.BaseAddress = new Uri( URL+ "/complexSearch");

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                try
                {
                    var dataObjects = response.Content.ReadAsAsync<Object>().Result;
                    return dataObjects;
                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
            }
            else
            {
                error = response.StatusCode.ToString();
            }

            client.Dispose();
            return Json(new ReturnObject() { Status = false, Error = error });
        }

        [HttpGet]
        [Route("GetRecipe")]
        public Object GetRecipe(string id)
        {
            //List<JsonResult<ReturnObject>> res = new List<JsonResult<ReturnObject>>();
            string error = " ";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL + "/" + id + "/information");

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                try
                {
                    var dataObjects = response.Content.ReadAsAsync<Object>().Result;
                    return dataObjects;
                }
                catch (Exception ex)
                {
                    error = ex.Message;
                }
            }
            else
            {
                error = response.StatusCode.ToString();
            }

            client.Dispose();
            return Json(new ReturnObject() { Status = false, Error = error });
        }
        [HttpGet]
        [Route("GetTry")]
        public Object GetTry(string id)
        {
            //List<JsonResult<ReturnObject>> res = new List<JsonResult<ReturnObject>>();
            string error = " ";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL+"/"+id+ "/similar");

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(urlParameters).Result;  
            if (response.IsSuccessStatusCode)
            {
                try
                {
                    var dataObjects = response.Content.ReadAsAsync<Object>().Result;  
                    return dataObjects;
                }
                catch(Exception ex)
                {
                    error = ex.Message;
                }
            }
            else
            {
                error = response.StatusCode.ToString();
            }

            client.Dispose();
            return Json(new ReturnObject() { Status = false, Error = error });
        }

    }
}