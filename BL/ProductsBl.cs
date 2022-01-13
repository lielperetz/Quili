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
            ProductsDal.AddProduct(p2);
            p.Code = p2.CODE;
        }

        public static List<PRODUCTS> GetRecipeProducts(short id)
        {
            return ProductsDal.GetProduct().FindAll(x => x.RECIPE_CODE == id);
        }
    }
}
