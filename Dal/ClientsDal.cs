using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class ClientsDal
    {
        static FINAL_PROJECTEntities db = new FINAL_PROJECTEntities();
        //שליפה
        public static List<CLIENTS> GetClients()
        {
            return db.CLIENTS.ToList();
        }
        //הוספת לקוח
        public static void AddClient(CLIENTS c)
        {
            db.CLIENTS.Add(c);
            db.SaveChanges();
        }
        //מחיקה
        public static void RemoveClient(string mail)
        {
            db.CLIENTS.Remove(db.CLIENTS.FirstOrDefault(x => x.MAIL == mail));
            db.SaveChanges();
        }
        ////עדכון
        //public static void UpdateClient(CLIENTS c)
        //{
        //    db.CLIENTS.FirstOrDefault(x => x.MAIL == c.MAIL).MAIL = c.MAIL;
        //    db.CLIENTS.FirstOrDefault(x => x.ID == c.ID).PASSWORD = c.PASSWORD;
        //    db.CLIENTS.FirstOrDefault(x => x.ID == c.ID).CREDIT_NUMBER = c.CREDIT_NUMBER;
        //}
    }
}
