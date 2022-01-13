using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace finalProject.Controllers
{
    public class ReturnObject
    {
        public bool Status { get; set; }
        public string Error { get; set; }
        public object Data { get; set; }

    }
}