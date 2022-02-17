using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Entities;

namespace BL
{
    public class ProductsBl
    {
        public static void AddProducts(ProductsEntities p)
        {
            PRODUCTS p2 = ProductsEntities.ConvertToDB(p);
            DalCode.AddProduct(p2);
            p.Code = p2.CODE;
        }

        public static List<ProductsEntities> GetRecipeProducts(short id, int recipeCode= 0)
        {
            var products = DalCode.GetProduct().Where(x => x.RECIPE_CODE == id).ToList();
            //return ProductsEntities.ConvertToListEntities(DalCode.GetProduct()).FindAll(x => x.RecipeCode == id);
            return ProductsEntities.ConvertToListEntities(products, recipeCode);
        }
    }
}
