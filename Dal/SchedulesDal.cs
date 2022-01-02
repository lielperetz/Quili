using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class SchedulesDal
    {
        static FINAL_PROJECTEntities db = new FINAL_PROJECTEntities();
        //שליפה
        public static List<SCHEDULES> GetSchedules()
        {
            return db.SCHEDULES.ToList();
        }
        //הוספה
        public static void AddSchedules(SCHEDULES s)
        {
            db.SCHEDULES.Add(s);
            db.SaveChanges();
        }
        //מחיקה
        public static void RemoveSchedules()
        {
            //db.RECIPES.Remove(db.RECIPES.FirstOrDefault(x => x. == ));
            db.SaveChanges();
        }
        ////עדכון
        //public static void UpdateSchedules(RECIPES r)
        //{
        //
        //}
    }
}
