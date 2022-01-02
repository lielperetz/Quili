using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace Entities
{
    public class SchedulesEntities
    {
        public short Code { get; set; }
        public short RecipeCode { get; set; }

        public string Mail { get; set; }
        public string RecipeId { get; set; }
        public string RecipeTitle { get; set; }
        public string RecipeImage { get; set; }
        public int? SchedulingStatuse { get; set; }
        public DateTime RecipeDate { get; set; }

        public DateTime? Date { get; set; }
        public int? Amount { get; set; }


        //המרה מאובייקט מסוג מסד התונים לאובייקט מסוג אנטיטיז
        public static SchedulesEntities ConvertToEntities(SCHEDULES s)
        {
            return new SchedulesEntities() { Code = s.CODE, RecipeCode = s.RECIPES.CODE,Mail=s.RECIPES.MAIL,RecipeId=s.RECIPES.RECIPE_ID,RecipeTitle=s.RECIPES.RECIPE_TITLE,RecipeImage=s.RECIPES.RECIPE_IMAGE,RecipeDate=s.RECIPES.DATE, Date = s.DATE, Amount=s.AMOUNT };
        }
        //המרה מסוג אנטיטיז לסוג מסד נתונים
        public static SCHEDULES ConvertToDB(SchedulesEntities s)
        {
            return new SCHEDULES() { CODE = s.Code, RECIPE_CODE = s.RecipeCode, DATE = s.Date, AMOUNT = s.Amount };
        }
        //המרה מסוג רשימת מסד נתונים לרשימת אנטיטיז
        public static List<SchedulesEntities> ConvertToListEntities(List<SCHEDULES> listS)
        {
            List<SchedulesEntities> ls = new List<SchedulesEntities>();
            foreach (var item in listS)
            {
                ls.Add(ConvertToEntities(item));
            }
            return ls;
        }
        //המרה מסוג רשימת אנטיטיז לרשימת מסד נתונים
        public static List<SCHEDULES> ConvaertToListDB(List<SchedulesEntities> listS)
        {
            List<SCHEDULES> ls = new List<SCHEDULES>();
            foreach (var item in listS)
            {
                ls.Add(ConvertToDB(item));
            }
            return ls;
        }

    }
}
