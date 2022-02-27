using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Entities;

namespace BL
{
    public class RecipesBl
    {
        public static List<RecipesEntities> GetRecipes()
        {
            return RecipesEntities.ConvertToListEntities(DalCode.GetRecipes());
        }
        public static List<RecipesEntities> GetSavedRecipes(string mail)
        {
            return RecipesEntities.ConvertToListEntities(DalCode.GetRecipes()).FindAll(x => x.Mail == mail);
        }
        public static RecipesEntities GetRecipeByLocalId(short id)
        {
            return RecipesEntities.ConvertToListEntities(DalCode.GetRecipes()).FirstOrDefault(x => x.Code == id);
        }
        public static void AddRecipe(RecipesEntities r)
        {
            RECIPES r2 = RecipesEntities.ConvertToDB(r);
            DalCode.AddRecipe(r2);
            r.Code = r2.CODE;
        }
    }
}
