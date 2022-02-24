using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace Entities
{
    public class SavedRecipesEntities
    {
        public string Mail { get; set; }
        
        public string Password { get; set; }

        public string Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Summary { get; set; }
        public int? ReadyInMinutes { get; set; }
        public int? Servings { get; set; }
        public int? AggregateLikes { get; set; }
        public double? SpoonacularScore { get; set; }


        //המרה מאובייקט מסוג מסד התונים לאובייקט מסוג אנטיטיז
        public static SavedRecipesEntities ConvertToEntities(SAVED_RECIPES r)
        {
            SavedRecipesEntities r2= new SavedRecipesEntities() { Mail = r.MAIL, Password = r.CLIENTS.PASSWORD, Id = r.RECIPE_ID, Title = r.RECIPE_TITLE, Image = r.RECIPE_IMAGE, Summary = r.RECIPE_SUMMARY, ReadyInMinutes = r.READY_IN_MINUTES, Servings = r.SERVINGS, AggregateLikes = r.NUM_LIKES, SpoonacularScore = r.RATING };
            return r2;
        }
        //המרה מסוג אנטיטיז לסוג מסד נתונים
        public static SAVED_RECIPES ConvertToDB(SavedRecipesEntities r)
        {
            return new SAVED_RECIPES() { MAIL = r.Mail, RECIPE_ID = r.Id, RECIPE_TITLE = r.Title, RECIPE_IMAGE = r.Image, RECIPE_SUMMARY = r.Summary, READY_IN_MINUTES = r.ReadyInMinutes, SERVINGS = r.Servings, NUM_LIKES = r.AggregateLikes, RATING = r.SpoonacularScore };
        }
        //המרה מסוג רשימת מסד נתונים לרשימת אנטיטיז
        public static List<SavedRecipesEntities> ConvertToListEntities(List<SAVED_RECIPES> listR)
        {
            List<SavedRecipesEntities> lr = new List<SavedRecipesEntities>();
            foreach (var item in listR)
            {
                lr.Add(ConvertToEntities(item));
            }
            return lr;
        }
        //המרה מסוג רשימת אנטיטיז לרשימת מסד נתונים
        public static List<SAVED_RECIPES> ConvaertToListDB(List<SavedRecipesEntities> listR)
        {
            List<SAVED_RECIPES> lr = new List<SAVED_RECIPES>();
            foreach (var item in listR)
            {
                lr.Add(ConvertToDB(item));
            }
            return lr;
        }

    }
}
