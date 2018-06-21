using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BuildPC.Models;

namespace BuildPC.Controllers
{
    public class RAMController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IEnumerable<RAM> GetAllProduct()
        {
            IList<RAM> proList = new List<RAM>();
            var query = (from prods in context.RAMs select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new RAM
                {
                    MaRam = item.MaRam,
                    Model = item.Model,
                    LoaiRam = item.LoaiRam,
                    TocDoBus= Convert.ToInt32(item.TocDoBus),
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    HangSX= item.HangSX,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem= Convert.ToInt32(item.Diem),
                    DanhGia= Convert.ToInt32(item.DanhGia),
                    URL= item.URL
                });
            }
            return proList;
        }

        public RAM GetByID(string id)
        {
            RAM proList = new RAM();
            var query = (from prods in context.RAMs where prods.MaRam == id select prods).ToList();
            foreach (var item in query)
            {
                proList = new RAM
                {
                    MaRam = item.MaRam,
                    Model = item.Model,
                    LoaiRam = item.LoaiRam,
                    TocDoBus = Convert.ToInt32(item.TocDoBus),
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    HangSX = item.HangSX,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                };
            }
            return proList;
        }

        [Route("api/ram/getlist/{Tiendu}/{Giaban}/{Dungluong}/{Loairam}")]
        public IEnumerable<RAM> GetList(int Tiendu, int Giaban, int Dungluong, string Loairam)
        {
            IList<RAM> proList = new List<RAM>();
            var query = (from prods in context.RAMs where( (prods.Giaban - Giaban <= Tiendu) && (prods.DungLuong >= Dungluong)&&(prods.LoaiRam==Loairam)) select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new RAM
                {
                    MaRam = item.MaRam,
                    Model = item.Model,
                    LoaiRam = item.LoaiRam,
                    TocDoBus = Convert.ToInt32(item.TocDoBus),
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    HangSX = item.HangSX,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [HttpPost]
        public void Post(RAM ram)
        {
            string ID = "RA";
            RAM RamLast = new RAM();
            RamLast = context.RAMs.OrderByDescending(r => r.MaRam).FirstOrDefault();
            string temp = RamLast.MaRam.ToString().Substring(2);
            temp = (Int32.Parse(temp)+1).ToString();
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

            ram.MaRam = ID;

            RAM RamNeedAdd = new RAM
            {
                MaRam = ram.MaRam,
                Model = ram.Model,
                LoaiRam = ram.LoaiRam,
                TocDoBus = Convert.ToInt32(ram.TocDoBus),
                DungLuong = Convert.ToInt32(ram.DungLuong),
                HangSX = ram.HangSX,
                Giaban = Convert.ToInt32(ram.Giaban),
                Diem = Convert.ToInt32(ram.Diem),
                DanhGia = Convert.ToInt32(ram.DanhGia),
                URL = ram.URL
            };

            if (ram == null)
            {
                throw new ArgumentNullException();
            }
            context.RAMs.Add(RamNeedAdd);
            context.SaveChanges();
        }

        [HttpPost]
        [Route("api/ram/delete/{MaRam}")]
        public void Delete(string MaRam)
        {
            if (MaRam == null)
                throw new ArgumentNullException();
            RAM ram = context.RAMs.SingleOrDefault(r => r.MaRam == MaRam);
            context.RAMs.Remove(ram);
            context.SaveChanges();
        }

        [HttpPut]
        public IHttpActionResult Put(RAM ram)
        {
            if (ram.MaRam == null)
            {
                return BadRequest();
            }
            context.Entry(ram).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/ram/sort/{Price1:int}/{Price2:int}")]
        [HttpGet]
        public IEnumerable<RAM> Sort(int Price1, int Price2)
        {
            List<RAM> lstRam = context.RAMs.ToList();
            List<RAM> lstRamNeed = new List<RAM>();
            foreach (RAM ram in lstRam)
                if (ram.Giaban <= Price2 && ram.Giaban >= Price1)
                    lstRamNeed.Add(ram);
            IList<RAM> proList = new List<RAM>();
            foreach (var item in lstRamNeed)
            {
                proList.Add(new RAM
                {
                    MaRam = item.MaRam,
                    Model = item.Model,
                    LoaiRam = item.LoaiRam,
                    TocDoBus = Convert.ToInt32(item.TocDoBus),
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    HangSX = item.HangSX,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("api/ram/search/{NAME}")]
        [HttpGet]
        public IEnumerable<RAM> Search(string NAME)
        {
            List<RAM> lstRam = new List<RAM>();
            lstRam = context.RAMs.SqlQuery($"Select * From RAM Where Model like '%{NAME}%'").ToList();

            IList<RAM> proList = new List<RAM>();
            foreach (var item in lstRam)
            {
                proList.Add(new RAM
                {
                    MaRam = item.MaRam,
                    Model = item.Model,
                    LoaiRam = item.LoaiRam,
                    TocDoBus = Convert.ToInt32(item.TocDoBus),
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    HangSX = item.HangSX,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }
    }
}
