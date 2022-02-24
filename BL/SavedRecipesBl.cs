using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Entities;

namespace BL
{
    public class SavedRecipesBl
    {
        public static List<SavedRecipesEntities> GetSavedRecipes(string mail)
        {
            return SavedRecipesEntities.ConvertToListEntities(DalCode.GetSavedRecipes()).FindAll(x => x.Mail == mail);
        }

        public static bool IsSaved(string id, string mail)
        {
            return DalCode.GetSavedRecipes().Any(x => x.MAIL == mail && x.RECIPE_ID == id);
        }

        public static void AddToSavedRecipes(SavedRecipesEntities r)
        {
            DalCode.AddSavedRecipe(SavedRecipesEntities.ConvertToDB(r));
        }

        public static void RemoveSavedRecipe(string id)
        {
            DalCode.RemoveSavedRecipe(id);
        }
    }
}
