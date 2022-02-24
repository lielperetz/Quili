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
        public static void AddClient(ClientsEntities c)
        {
            DalCode.AddClient(ClientsEntities.ConvertToDB(c));
        }
        public static bool IsExist(string mail)
        {
            return DalCode.GetClients().Any(x => x.MAIL.CompareTo(mail) == 0);
        }

        public static bool Login(string mail, string password)
        {
            return DalCode.GetClients().Any(x => x.MAIL.CompareTo(mail) == 0 && x.PASSWORD.CompareTo(password) == 0);
        }
    }
}
