using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Entities;

namespace BL
{
    public class ClientsBl
    {
        //הוספה
        public static void AddClient(ClientsEntities c)
        {
            ClientsDal.AddClient(ClientsEntities.ConvertToDB(c));
        }
        //בדיקה האם קיים לקוח לפי מייל וסיסמא
        public static bool IsExist(string mail, string password)
        {
            return ClientsDal.GetClients().Any(x => x.MAIL.CompareTo(mail) == 0 && x.PASSWORD.CompareTo(password) == 0);
        }
    }
}
