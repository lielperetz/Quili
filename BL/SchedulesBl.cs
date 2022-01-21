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
        public static List<SchedulesEntities> GetSchedulesByRange(DateTime d1,DateTime d2, string mail)
        {
            var l = SchedulesEntities.ConvertToListEntities(SchedulesDal.GetSchedules()).FindAll(x => x.Mail == mail && x.Date >= d1 && x.Date <= d2).ToList();
            return l;
        }
    }
}
