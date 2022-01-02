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
            SchedulesDal.AddSchedules(SchedulesEntities.ConvertToDB(s));
        }
        //שליפת רשומות לפי טווח תאריכים
        public static List<SCHEDULES> GetSchedulesByRange(DateTime d1,DateTime d2, string mail)
        {
            return SchedulesDal.GetSchedules().FindAll(x => x.RECIPES.MAIL == mail && x.DATE >= d1 && x.DATE <= d2);
        }
    }
}
