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

        #region clients 
        public static List<CLIENTS> GetClients()
        {
            return db.CLIENTS.ToList();
        }
        public static void AddClient(CLIENTS c)
        {
            db.CLIENTS.Add(c);
            db.SaveChanges();
        }
        public static void RemoveClient(string mail)
        {
            db.CLIENTS.Remove(db.CLIENTS.FirstOrDefault(x => x.MAIL == mail));
            db.SaveChanges();
        }
        //public static void UpdateClient(CLIENTS c)
        //{
        //    db.CLIENTS.FirstOrDefault(x => x.MAIL == c.MAIL).MAIL = c.MAIL;
        //    db.CLIENTS.FirstOrDefault(x => x.ID == c.ID).PASSWORD = c.PASSWORD;
        //    db.CLIENTS.FirstOrDefault(x => x.ID == c.ID).CREDIT_NUMBER = c.CREDIT_NUMBER;
        //}
        #endregion

        #region recipes
        public static List<RECIPES> GetRecipes()
        {
            return db.RECIPES.ToList();
        }
        public static void AddRecipe(RECIPES r)
        {
            db.RECIPES.Add(r);
            db.SaveChanges();
        }
        public static void RemoveRecipe(short id)
        {
            db.RECIPES.Remove(db.RECIPES.FirstOrDefault(x => x.CODE == id));
            db.SaveChanges();
        }
        #endregion

        #region schedules
        public static List<SCHEDULES> GetSchedules()
        {
            return db.SCHEDULES.ToList();
        }
        public static void AddSchedules(SCHEDULES s)
        {
            db.SCHEDULES.Add(s);
            db.SaveChanges();
        }
        public static void RemoveSchedules(short id)
        {
            db.SCHEDULES.Remove(db.SCHEDULES.FirstOrDefault(x => x.CODE == id));
            db.SaveChanges();
        }
        #endregion

        #region products 
        public static List<PRODUCTS> GetProduct()
        {
            return db.PRODUCTS.ToList();
        }
        public static void AddProduct(PRODUCTS p)
        {
            db.PRODUCTS.Add(p);
            db.SaveChanges();
        }
        public static void RemoveProducts(short code)
        {
            db.PRODUCTS.Remove(db.PRODUCTS.FirstOrDefault(x => x.CODE == code));
            db.SaveChanges();
        }
        #endregion

        #region saved recipes
        public static List<SAVED_RECIPES> GetSavedRecipes()
        {
            return db.SAVED_RECIPES.ToList();
        }
        public static void AddSavedRecipe(SAVED_RECIPES r)
        {
            db.SAVED_RECIPES.Add(r);
            db.SaveChanges();
        }
        public static void RemoveSavedRecipe(string id)
        {
            db.SAVED_RECIPES.Remove(db.SAVED_RECIPES.FirstOrDefault(x => x.RECIPE_ID == id));
            db.SaveChanges();
        }
        #endregion
    }
}
