using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Entities;

namespace BL
{
    public class SchedulesBl
    {
        //הוספה
        public static void AddSchedules(SchedulesEntities s)
        {
            SCHEDULES s2 = SchedulesEntities.ConvertToDB(s);
            DalCode.AddSchedules(s2);
        }
        //שליפת רשומות לפי טווח תאריכים
        public static List<SchedulesEntities> GetSchedulesByRange(DateTime d1,DateTime d2, string mail)
        {
            List<SCHEDULES> listS = DalCode.GetSchedules().Where(x => x.RECIPES!=null && x.RECIPES.MAIL == mail && x.DATE >= d1 && x.DATE <= d2).ToList();
            var l = SchedulesEntities.ConvertToListEntities(listS);
            return l;
        }
        //הסרת רשומה
        public static void RemoveSchedule(short id)
        {
            short idR = DalCode.GetSchedules().FirstOrDefault(x => x.CODE == id).RECIPE_CODE;
            bool hasS = DalCode.GetSchedules().Any(x => x.RECIPE_CODE == idR && x.CODE != id);
            if (!hasS)
            {
                var listP = DalCode.GetProduct().Where(x => x.RECIPE_CODE == idR);
                foreach(var item in listP)
                {
                    DalCode.RemoveProducts(item.CODE);
                }
                DalCode.RemoveSchedules(id);
                DalCode.RemoveRecipe(idR);
            }
            else
                DalCode.RemoveSchedules(id);
        }
    }
}
