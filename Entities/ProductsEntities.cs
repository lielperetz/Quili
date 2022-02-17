using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace Entities
{
    public class ProductsEntities
    {
        public short Code { get; set; }
        public short RecipeCode { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public short? Category { get; set; }

        public int? RecipeUniqeCode { get; set; }

        //המרה מאובייקט מסוג מסד התונים לאובייקט מסוג אנטיטיז
        public static ProductsEntities ConvertToEntities(PRODUCTS p,  int recipeCode = 0)
        {
            ProductsEntities p2= new ProductsEntities() {Code=p.CODE, RecipeCode = p.RECIPE_CODE, ProductName = p.PRODUCT_NAME, ProductImage = p.PRODUCT_IMAGE,Unit=p.UNIT, Amount = p.AMOUNT, Category = p.CATEGORY, RecipeUniqeCode = recipeCode };
            return p2;
        }
        //המרה מסוג אנטיטיז לסוג מסד נתונים
        public static PRODUCTS ConvertToDB(ProductsEntities p)
        {
            return new PRODUCTS() { CODE = p.Code, RECIPE_CODE = p.RecipeCode, PRODUCT_NAME = p.ProductName, PRODUCT_IMAGE = p.ProductImage,UNIT=p.Unit, AMOUNT = p.Amount, CATEGORY = p.Category };
        }
        //המרה מסוג רשימת מסד נתונים לרשימת אנטיטיז
        public static List<ProductsEntities> ConvertToListEntities(List<PRODUCTS> listP, int recipeCode=0)
        {
            List<ProductsEntities> lp = new List<ProductsEntities>();
            foreach (var item in listP)
            {
                lp.Add(ConvertToEntities(item, recipeCode));
            }
            return lp;
        }
        //המרה מסוג רשימת אנטיטיז לרשימת מסד נתונים
        public static List<PRODUCTS> ConvaertToListDB(List<ProductsEntities> listP)
        {
            List<PRODUCTS> lp = new List<PRODUCTS>();
            foreach (var item in listP)
            {
                lp.Add(ConvertToDB(item));
            }
            return lp;
        }

    }
}
