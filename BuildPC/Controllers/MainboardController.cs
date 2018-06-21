using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BuildPC.Models;

namespace BuildPC.Controllers
{
    public class MainboardController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IEnumerable<Mainboard> GetAllProduct()
        {
            IList<Mainboard> proList = new List<Mainboard>();
            var query = (from prods in context.Mainboards select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new Mainboard
                {
                    MaMain = item.MaMain,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Chipset = item.Chipset,
                    Socket = item.Socket,
                    RamToiDa = Convert.ToInt32(item.RamToiDa),
                    PCI = item.PCI,
                    SoKheRam = Convert.ToInt32(item.SoKheRam),
                    Giaban = Convert.ToInt32(item.Giaban),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Diem = Convert.ToInt32(item.Diem),
                    URL = item.URL,
                    LoaiRamToiDa = item.LoaiRamToiDa

                });
            }
            return proList;
        }

        public Mainboard GetByID(string id)
        {
            Mainboard proList = new Mainboard();
            var query = (from prods in context.Mainboards where prods.MaMain == id select prods).ToList();
            foreach (var item in query)
            {
                proList = new Mainboard
                {
                    MaMain = item.MaMain,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    Chipset = item.Chipset,
                    RamToiDa = Convert.ToInt32(item.RamToiDa),
                    PCI = item.PCI,
                    SoKheRam = Convert.ToInt32(item.SoKheRam),
                    Giaban = Convert.ToInt32(item.Giaban),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Diem = Convert.ToInt32(item.Diem),
                    URL = item.URL,
                    LoaiRamToiDa = item.LoaiRamToiDa

                };
            }
            return proList;
        }

        [Route("api/mainboard/{Socket}/{PCI}/{Tiendu}/{Giaban}")]
        public IEnumerable<Mainboard> GetList(string Socket, string PCI, int Tiendu, int Giaban)
        {
            IList<Mainboard> proList = new List<Mainboard>();
            var query = (from prods in context.Mainboards where (((prods.Socket == Socket) && (prods.PCI == PCI)) && (prods.Giaban - Giaban <= Tiendu)) select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new Mainboard
                {
                    MaMain = item.MaMain,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    RamToiDa = Convert.ToInt32(item.RamToiDa),
                    PCI = item.PCI,
                    SoKheRam = Convert.ToInt32(item.SoKheRam),
                    Giaban = Convert.ToInt32(item.Giaban),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Diem = Convert.ToInt32(item.Diem),
                    URL = item.URL,
                    LoaiRamToiDa = item.LoaiRamToiDa
                });
            }
            return proList;
        }

        [Route("api/mainboard/{Socket}/{Tiendu}/{Giaban}")]
        public IEnumerable<Mainboard> GetList2(string Socket, int Tiendu, int Giaban)
        {
            IList<Mainboard> proList = new List<Mainboard>();
            var query = (from prods in context.Mainboards where ((prods.Socket == Socket) && (prods.Giaban - Giaban <= Tiendu)) select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new Mainboard
                {
                    MaMain = item.MaMain,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    RamToiDa = Convert.ToInt32(item.RamToiDa),
                    PCI = item.PCI,
                    SoKheRam = Convert.ToInt32(item.SoKheRam),
                    Giaban = Convert.ToInt32(item.Giaban),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Diem = Convert.ToInt32(item.Diem),
                    URL = item.URL,
                    LoaiRamToiDa = item.LoaiRamToiDa
                });
            }
            return proList;
        }

        [HttpPost]
        public void Post(Mainboard main)
        {
            string ID = "MA";
            Mainboard MainLast = new Mainboard();
            MainLast = context.Mainboards.OrderByDescending(r => r.MaMain).FirstOrDefault();
            string temp = MainLast.MaMain.ToString().Substring(2);
            temp = (Int32.Parse(temp) + 1).ToString();
            if (temp.Count() == 4)
            {
                ID = ID + int.Parse(temp);
            }
            else
                if (temp.Count() == 3)
            {
                ID = ID + "0" + int.Parse(temp);
            }
            else
                    if (temp.Count() == 2)
            {
                ID = ID + "00" + int.Parse(temp);
            }
            else
                ID = ID + "000" + int.Parse(temp);

            main.MaMain = ID;

            Mainboard MainNeedAdd = new Mainboard
            {
                MaMain = main.MaMain,
                HangSX = main.HangSX,
                Model = main.Model,
                Socket = main.Socket,
                RamToiDa = Convert.ToInt32(main.RamToiDa),
                PCI = main.PCI,
                SoKheRam = Convert.ToInt32(main.SoKheRam),
                Giaban = Convert.ToInt32(main.Giaban),
                DanhGia = Convert.ToInt32(main.DanhGia),
                Diem = Convert.ToInt32(main.Diem),
                URL = main.URL,
                LoaiRamToiDa = main.LoaiRamToiDa
            };

            if (main == null)
            {
                throw new ArgumentNullException();
            }
            context.Mainboards.Add(MainNeedAdd);
            context.SaveChanges();
        }

        [HttpPost]
        [Route("api/main/delete/{MaMain}")]
        public void Delete(string MaMain)
        {
            if (MaMain == null)
                throw new ArgumentNullException();
            Mainboard main = context.Mainboards.SingleOrDefault(m => m.MaMain == MaMain);
            context.Mainboards.Remove(main);
            context.SaveChanges();
        }

        [HttpPut]
        public IHttpActionResult Put(Mainboard main)
        {
            if (main.MaMain == null)
            {
                return BadRequest();
            }
            context.Entry(main).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/main/sort/{Price1:int}/{Price2:int}")]
        [HttpGet]
        public IEnumerable<Mainboard> Sort(int Price1, int Price2)
        {
            List<Mainboard> lstMain = context.Mainboards.ToList();
            List<Mainboard> lstMainNeed = new List<Mainboard>();
            foreach (Mainboard main in lstMain)
                if (main.Giaban <= Price2 && main.Giaban >= Price1)
                    lstMainNeed.Add(main);
            IList<Mainboard> proList = new List<Mainboard>();
            foreach (var item in lstMainNeed)
            {
                proList.Add(new Mainboard
                {
                    MaMain = item.MaMain,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    RamToiDa = Convert.ToInt32(item.RamToiDa),
                    PCI = item.PCI,
                    SoKheRam = Convert.ToInt32(item.SoKheRam),
                    Giaban = Convert.ToInt32(item.Giaban),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Diem = Convert.ToInt32(item.Diem),
                    URL = item.URL,
                    LoaiRamToiDa = item.LoaiRamToiDa
                });
            }
            return proList;
        }

        [Route("api/main/search/{NAME}")]
        [HttpGet]
        public IEnumerable<Mainboard> Search(string NAME)
        {
            List<Mainboard> lstMain = new List<Mainboard>();
            lstMain = context.Mainboards.SqlQuery($"Select * From Mainboard Where Model like '%{NAME}%'").ToList();

            IList<Mainboard> proList = new List<Mainboard>();
            foreach (var item in lstMain)
            {
                proList.Add(new Mainboard
                {
                    MaMain = item.MaMain,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    RamToiDa = Convert.ToInt32(item.RamToiDa),
                    PCI = item.PCI,
                    SoKheRam = Convert.ToInt32(item.SoKheRam),
                    Giaban = Convert.ToInt32(item.Giaban),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Diem = Convert.ToInt32(item.Diem),
                    URL = item.URL,
                    LoaiRamToiDa = item.LoaiRamToiDa
                });
            }
            return proList;
        }
    }
}