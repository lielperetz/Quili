using System.Collections.Generic;
using Dal;
namespace Entities
{
    public class ClientsEntities
    {
        public string Mail { get; set; }
        public string Password { get; set; }

        //המרה מאובייקט מסוג מסד התונים לאובייקט מסוג אנטיטיז
        public static ClientsEntities ConvertToEntities(CLIENTS c)
        {
            return new ClientsEntities() { Mail = c.MAIL, Password = c.PASSWORD };
        }
        //המרה מסוג אנטיטיז לסוג מסד נתונים
        public static CLIENTS ConvertToDB(ClientsEntities c)
        {
            return new CLIENTS() { MAIL = c.Mail, PASSWORD = c.Password };
        }
        //המרה מסוג רשימת מסד נתונים לרשימת אנטיטיז
        public static List<ClientsEntities> ConvertToListEntities(List<CLIENTS> listC)
        {
            List<ClientsEntities> lc = new List<ClientsEntities>();
            foreach (var item in listC)
            {
                lc.Add(ConvertToEntities(item));
            }
            return lc;
        }
        //המרה מסוג רשימת אנטיטיז לרשימת מסד נתונים
        public static List<CLIENTS> ConvaertToListDB(List<ClientsEntities> listC)
        {
            List<CLIENTS> lc = new List<CLIENTS>();
            foreach (var item in listC)
            {
                lc.Add(ConvertToDB(item));
            }
            return lc;
        }
    }
}
