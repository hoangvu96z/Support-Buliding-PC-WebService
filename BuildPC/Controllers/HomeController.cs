using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BuildPC.Models;
using BuildPC.Controllers;


namespace BuildPC.Controllers
{
    public class HomeController : Controller
    {
        DOANCNEntities context = new DOANCNEntities();

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }

        public ActionResult Build1()
        {
            ViewBag.Title = "Build";

            return View();
        }

        public ActionResult QLCPU()
        {
            ViewBag.Title = "QLCPU";

            return View();
        }

        public ActionResult QLGPU()
        {
            ViewBag.Title = "QLGPU";

            return View();
        }

        public ActionResult QLHDD()
        {
            ViewBag.Title = "QLHDD";

            return View();
        }

        public ActionResult QLCasePC()
        {
            ViewBag.Title = "QLCasePC";

            return View();
        }


        public ActionResult QLMainboard()
        {
            ViewBag.Title = "QLMainboard";

            return View();
        }


        public ActionResult QLNguon()
        {
            ViewBag.Title = "QLNguon";

            return View();
        }


        public ActionResult Build2()
        {
            ViewBag.Title = "Build2";

            return View();
        }

        public ActionResult Quanly()
        {
            ViewBag.Title = "Quanly";

            return View();
        }

        public ActionResult Test()
        {
            ViewBag.Title = "Test";

            return View();
        }
    }
}
