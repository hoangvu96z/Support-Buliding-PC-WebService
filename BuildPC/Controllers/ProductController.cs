using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BuildPC.Models;
using BuildPC.Controllers;

namespace BuildPC.Controllers
{
    public class ProductController : Controller
    {
        DOANCNEntities context = new DOANCNEntities();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CPURankingList()
        {
            ViewBag.Title = "Xếp hạng CPU";
            return View();
        }
    }
}