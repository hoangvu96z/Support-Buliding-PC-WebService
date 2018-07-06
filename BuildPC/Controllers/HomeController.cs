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

        public ActionResult Build2()
        {
            ViewBag.Title = "Build2";

            return View();
        }

        [BasicAuthentication]
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

        public ActionResult Nangcap()
        {
            ViewBag.Title = "Nangcap";

            return View();
        }

        public ActionResult Login()
        {
            ViewBag.Title = "Login";

            return View();
        }

        public ActionResult Check()
        {
            ViewBag.Title = "Check";

            return View();
        }

        public ActionResult CheckRM()
        {
            ViewBag.Title = "CheckRM";

            return View();
        }

        public ActionResult CheckCM()
        {
            ViewBag.Title = "CheckCM";

            return View();
        }

        public ActionResult CheckGM()
        {
            ViewBag.Title = "CheckGM";

            return View();
        }

        public ActionResult CheckCG()
        {
            ViewBag.Title = "CheckCG";

            return View();
        }

        public ActionResult Ranking()
        {
            ViewBag.Title = "Bảng xếp hạng";

            return View();
        }

        public ActionResult QLCPU()
        {
            ViewBag.Title = "Quản lý CPU";

            return View();
        }

        public ActionResult QLGPU()
        {
            ViewBag.Title = "Quản lý GPU";

            return View();
        }

        public ActionResult QLHDD()
        {
            ViewBag.Title = "Quản lý HDD";

            return View();
        }

        public ActionResult QLCasePC()
        {
            ViewBag.Title = "Quản lý CasePC";

            return View();
        }

        public ActionResult QLMainboard()
        {
            ViewBag.Title = "Quản lý Mainboard";

            return View();
        }


        public ActionResult QLNguon()
        {
            ViewBag.Title = "Quản lý Nguon";

            return View();
        }

        public ActionResult QLRam()
        {
            ViewBag.Title = "Quản lý Ram";

            return View();
        }
    }
}
