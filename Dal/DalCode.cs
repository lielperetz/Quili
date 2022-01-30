using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class DalCode
    {
        static FINAL_PROJECTEntities db = new FINAL_PROJECTEntities();
        //שליפת משתמשים
        public static List<CLIENTS> GetClients()
        {
            return db.CLIENTS.ToList();
        }
        //הוספת משתמש
        public static void AddClient(CLIENTS c)
        {
            db.CLIENTS.Add(c);
            db.SaveChanges();
        }
        //מחיקת משתמש
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
        //שליפת מוצרים
        public static List<PRODUCTS> GetProduct()
        {
            return db.PRODUCTS.ToList();
        }
        //הוספת מוצרים
        public static void AddProduct(PRODUCTS p)
        {
            db.PRODUCTS.Add(p);
            db.SaveChanges();
        }
        //מחיקה
        public static void RemoveProduct()
        {
            //db.RECIPES.Remove(db.PRODUCTS.FirstOrDefault(x => x. == ));
            db.SaveChanges();
        }

        public static List<RECIPES> GetRecipes()
        {
            return db.RECIPES.ToList();
        }
        //הוספה
        public static void AddRecipe(RECIPES r)
        {
            db.RECIPES.Add(r);
            db.SaveChanges();
        }
        //מחיקה
        public static void RemoveRecipe()
        {
            //db.RECIPES.Remove(db.RECIPES.FirstOrDefault(x => x. == ));
            db.SaveChanges();
        }

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
    }
}
