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
        public static void RemoveSchedule(short id, int rec)
        {
            short idR = DalCode.GetSchedules().FirstOrDefault(x => x.CODE == id).RECIPE_CODE;
            switch (rec)
            {
                case 1:
                    DalCode.RemoveSchedules(id);
                    break;
                case 2:
                    var l = DalCode.GetSchedules().FindAll(x => x.RECIPE_CODE == idR);
                    foreach (var item in l)
                    {
                        DalCode.RemoveSchedules(item.CODE);
                    }
                    break;
                case 3:
                    var l2 = DalCode.GetSchedules().FindAll(x => x.RECIPE_CODE == idR && x.CODE >= id);
                    foreach (var item in l2)
                    {
                        DalCode.RemoveSchedules(item.CODE);
                    }
                    break;
            }
            bool hasS = DalCode.GetSchedules().Any(x => x.RECIPE_CODE == idR);
            if (!hasS)
            {
                var listP = DalCode.GetProduct().Where(x => x.RECIPE_CODE == idR);
                foreach(var item in listP)
                {
                    DalCode.RemoveProducts(item.CODE);
                }
                DalCode.RemoveRecipe(idR);
            }
        }
    }
}
