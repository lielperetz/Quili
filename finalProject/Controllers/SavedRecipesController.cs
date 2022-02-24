using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using BL;
using Entities;

namespace finalProject.Controllers
{
    [RoutePrefix("Api/SavedRecipes")]
    public class SavedRecipesController : ApiController
    {
        [HttpPut]
        [Route("AddToSavedRecipes")]
        public JsonResult<ReturnObject> AddToSavedRecipes(SavedRecipesEntities r)
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
                SavedRecipesBl.AddToSavedRecipes(r);
                return Json(new ReturnObject() { Status = true, Data = r.Mail });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
        }

        [HttpGet]
        [Route("GetSavedRecipes")]
        public JsonResult<ReturnObject> GetSavedRecipes()
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
                return Json(new ReturnObject() { Status = true, Data = SavedRecipesBl.GetSavedRecipes(mail) });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.Message });
            }
        }

        [HttpDelete]
        [Route("RemoveSavedRecipe/{id}")]
        public JsonResult<ReturnObject> RemoveSavedRecipe(string id)
        {
            try
            {
                SavedRecipesBl.RemoveSavedRecipe(id);
                return Json(new ReturnObject() { Status = true, Data = id });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
        }

        [HttpPut]
        [Route("IsSaved")]
        public JsonResult<ReturnObject> IsSaved(string id)
        {
            string mail = "";
            System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
            if (headers.Contains("Authorization"))
            {
                mail = headers.GetValues("Authorization").First();
            }
            else
            {
                return Json(new ReturnObject() { Status = false, Error = "Token is necessary" });
            }
            try
            {
                if (SavedRecipesBl.IsSaved(id, mail))
                    return Json(new ReturnObject() { Status = true, Data = true });
                else
                    return Json(new ReturnObject() { Status = true, Data = false });
            }
            catch (Exception ex)
            {
                return Json(new ReturnObject() { Status = false, Error = ex.ToString() });
            }
        }
    }
}