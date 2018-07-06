using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using BuildPC.Models;
using System.Web.Http;

namespace BuildPC.Controllers
{
    [RoutePrefix("api/hdd")]
    public class HDDController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IList<HDD> GetAllProduct()
        {
            IList<HDD> proList = new List<HDD>();
            var query = (from prods in context.HDDs select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new HDD
                {
                    MaHDD = item.MaHDD,
                    Model = item.Model,
                    LoaiOCung = item.LoaiOCung,
                    HangSX = item.HangSX,
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    ChuanKetNoi = item.HangSX,
                    TocDoDoc = Convert.ToInt32(item.TocDoDoc),
                    TocDoGhi = Convert.ToInt32(item.TocDoGhi),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL,
                    Giaban = Convert.ToInt32(item.Giaban)
                });
            }
            return proList;
        }

        public HDD GetByID(string id)
        {
            HDD proList = new HDD();
            var query = (from prods in context.HDDs where prods.MaHDD == id select prods).ToList();
            foreach (var item in query)
            {
                proList = (new HDD
                {
                    MaHDD = item.MaHDD,
                    Model = item.Model,
                    LoaiOCung = item.LoaiOCung,
                    HangSX = item.HangSX,
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    ChuanKetNoi = item.HangSX,
                    TocDoDoc = Convert.ToInt32(item.TocDoDoc),
                    TocDoGhi = Convert.ToInt32(item.TocDoGhi),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL,
                    Giaban = Convert.ToInt32(item.Giaban)
                });
            }
            return proList;
        }

        [HttpPost]
        public void Post(HDD hdd)
        {
            string ID = "HD";
            HDD HDDLast = new HDD();
            HDDLast = context.HDDs.OrderByDescending(r => r.MaHDD).FirstOrDefault();
            string temp = HDDLast.MaHDD.ToString().Substring(2);
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

            hdd.MaHDD = ID;

            HDD HDDNeedAdd = new HDD
            {
                MaHDD = hdd.MaHDD,
                Model = hdd.Model,
                LoaiOCung = hdd.LoaiOCung,
                HangSX = hdd.HangSX,
                DungLuong = Convert.ToInt32(hdd.DungLuong),
                ChuanKetNoi = hdd.HangSX,
                TocDoDoc = Convert.ToInt32(hdd.TocDoDoc),
                TocDoGhi = Convert.ToInt32(hdd.TocDoGhi),
                Diem = Convert.ToInt32(hdd.Diem),
                DanhGia = Convert.ToInt32(hdd.DanhGia),
                URL = hdd.URL,
                Giaban = Convert.ToInt32(hdd.Giaban)
            };

            if (hdd == null)
            {
                throw new ArgumentNullException();
            }
            context.HDDs.Add(HDDNeedAdd);
            context.SaveChanges();
        }

        [HttpPost]
        [Route("delete/{MaHDD}")]
        public void Delete(string MaHDD)
        {
            if (MaHDD == null)
                throw new ArgumentNullException();
            HDD hdd = context.HDDs.SingleOrDefault(h => h.MaHDD == MaHDD);
            context.HDDs.Remove(hdd);
            context.SaveChanges();
        }

        [HttpPut]
        public IHttpActionResult Put(HDD hdd)
        {
            if (hdd.MaHDD == null)
            {
                return BadRequest();
            }
            context.Entry(hdd).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("sort/{Price1:int}/{Price2:int}")]
        [HttpGet]
        public IList<HDD> Sort(int Price1, int Price2)
        {
            List<HDD> lstHDD = context.HDDs.ToList();
            List<HDD> lstHDDNeed = new List<HDD>();
            foreach (HDD hdd in lstHDD)
                if (hdd.Giaban <= Price2 && hdd.Giaban >= Price1)
                    lstHDDNeed.Add(hdd);
            IList<HDD> proList = new List<HDD>();
            foreach (var item in lstHDDNeed)
            {
                proList.Add(new HDD
                {
                    MaHDD = item.MaHDD,
                    Model = item.Model,
                    LoaiOCung = item.LoaiOCung,
                    HangSX = item.HangSX,
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    ChuanKetNoi = item.HangSX,
                    TocDoDoc = Convert.ToInt32(item.TocDoDoc),
                    TocDoGhi = Convert.ToInt32(item.TocDoGhi),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL,
                    Giaban = Convert.ToInt32(item.Giaban)
                });
            }
            return proList;
        }

        [Route("search/{NAME}")]
        [HttpGet]
        public IList<HDD> Search(string NAME)
        {
            List<HDD> lstHDD = new List<HDD>();
            lstHDD = context.HDDs.SqlQuery($"Select * From HDD Where Model like '%{NAME}%'").ToList();

            IList<HDD> proList = new List<HDD>();
            foreach (var item in lstHDD)
            {
                proList.Add(new HDD
                {
                    MaHDD = item.MaHDD,
                    Model = item.Model,
                    LoaiOCung = item.LoaiOCung,
                    HangSX = item.HangSX,
                    DungLuong = Convert.ToInt32(item.DungLuong),
                    ChuanKetNoi = item.HangSX,
                    TocDoDoc = Convert.ToInt32(item.TocDoDoc),
                    TocDoGhi = Convert.ToInt32(item.TocDoGhi),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL,
                    Giaban = Convert.ToInt32(item.Giaban)
                });
            }
            return proList;
        }
    }
}
