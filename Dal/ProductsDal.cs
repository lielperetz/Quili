using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class ProductsDal
    {
        static FINAL_PROJECTEntities db = new FINAL_PROJECTEntities();
        //שליפה
        public static List<PRODUCTS> GetProduct()
        {
            return db.PRODUCTS.ToList();
        }
        //הוספה
        public static void AddProduct(PRODUCTS p)
        {
            db.PRODUCTS.Add(p);
            db.SaveChanges();
        }
        //מחיקה
        public static void RemoveProduct()
        {
            //db.RECIPES.Remove(db.PRODUCTS.FirstOrDefault(x => x. == ));
            db.SaveChanges();
        }
        ////עדכון
        //public static void UpdateRecipe(RECIPES r)
        //{
        //
        //}
    }
}
