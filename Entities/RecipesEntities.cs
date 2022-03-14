using System;
using System.Collections.Generic;
using Dal;
namespace Entities
{
    public class RecipesEntities
    {
        public short Code { get; set; }
        public string Mail { get; set; }
        
        public string Password { get; set; }

        public string RecipeId { get; set; }
        public string RecipeTitle { get; set; }
        public string RecipeImage { get; set; }
        public int? SchedulingStatuse { get; set; }
        public DateTime Date { get; set; }

        //המרה מאובייקט מסוג מסד התונים לאובייקט מסוג אנטיטיז
        public static RecipesEntities ConvertToEntities(RECIPES r)
        {
            RecipesEntities r2= new RecipesEntities() {Code=r.CODE, Mail = r.MAIL, Password = r.CLIENTS.PASSWORD, RecipeId = r.RECIPE_ID, RecipeTitle = r.RECIPE_TITLE, RecipeImage = r.RECIPE_IMAGE, SchedulingStatuse = r.SCHEDULING_STATUSE, Date = r.DATE };
            return r2;
        }
        //המרה מסוג אנטיטיז לסוג מסד נתונים
        public static RECIPES ConvertToDB(RecipesEntities r)
        {
            return new RECIPES() { CODE = r.Code, MAIL = r.Mail, RECIPE_ID = r.RecipeId, RECIPE_TITLE = r.RecipeTitle, RECIPE_IMAGE = r.RecipeImage, SCHEDULING_STATUSE = r.SchedulingStatuse, DATE = r.Date };
        }
        //המרה מסוג רשימת מסד נתונים לרשימת אנטיטיז
        public static List<RecipesEntities> ConvertToListEntities(List<RECIPES> listR)
        {
            List<RecipesEntities> lr = new List<RecipesEntities>();
            foreach (var item in listR)
            {
                lr.Add(ConvertToEntities(item));
            }
            return lr;
        }
        //המרה מסוג רשימת אנטיטיז לרשימת מסד נתונים
        public static List<RECIPES> ConvaertToListDB(List<RecipesEntities> listR)
        {
            List<RECIPES> lr = new List<RECIPES>();
            foreach (var item in listR)
            {
                lr.Add(ConvertToDB(item));
            }
            return lr;
        }

    }
}
