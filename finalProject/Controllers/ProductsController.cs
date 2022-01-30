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
    
    [RoutePrefix("Api/Products")]
    public class ProductsController : ApiController
    {
        
        public static bool AddProducts(string apiId, short id)
        {
            try
            {
                dynamic data = ApiRecipes.GetRecipeIngredients(apiId);
                foreach (var item in data["ingredients"])
                {
                    ProductsBl.AddProducts(new ProductsEntities() { RecipeCode = id, ProductName = item["name"], ProductImage = item["image"], Amount = item["amount"]["metric"]["value"],Unit=item["amount"]["metric"]["unit"], Category = 0 });
                }

                return true ;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public static List<ProductsEntities> GetRecipeProducts(short id)
        {
            return ProductsBl.GetRecipeProducts(id);
        }
    }
}