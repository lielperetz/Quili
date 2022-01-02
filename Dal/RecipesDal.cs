using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class RecipesDal
    {
        static FINAL_PROJECTEntities db = new FINAL_PROJECTEntities();
        //שליפה
        public static List<RECIPES> GetRecipes()
        {
            return db.RECIPES.ToList();
        }
        //הוספה
        public static void AddRecipe(RECIPES r)
        {
            db.RECIPES.Add(r);
            db.SaveChanges();
        }
        //מחיקה
        public static void RemoveRecipe()
        {
            //db.RECIPES.Remove(db.RECIPES.FirstOrDefault(x => x. == ));
            db.SaveChanges();
        }
        ////עדכון
        //public static void UpdateRecipe(RECIPES r)
        //{
        //
        //}
    }
}
