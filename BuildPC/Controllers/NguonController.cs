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
    public class NguonController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IEnumerable<Nguon> GetAllProduct()
        {
            IList<Nguon> proList = new List<Nguon>();
            var query = (from prods in context.Nguons select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new Nguon
                {
                    MaNguon = item.MaNguon,
                    Model = item.Model,
                    HangSX = item.HangSX,
                    CongSuat = Convert.ToInt32(item.CongSuat),
                    HieuSuat = Convert.ToInt32(item.HieuSuat),
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    Danhgia = Convert.ToInt32(item.Danhgia),
                    URL = item.URL

                });
            }
            return proList;
        }

        public Nguon GetByID(string id)
        {
            Nguon proList = new Nguon();
            var query = (from prods in context.Nguons where prods.MaNguon == id select prods).ToList();
            foreach (var item in query)
            {
                proList = (new Nguon
                {
                    MaNguon = item.MaNguon,
                    Model = item.Model,
                    HangSX = item.HangSX,
                    CongSuat = Convert.ToInt32(item.CongSuat),
                    HieuSuat = Convert.ToInt32(item.HieuSuat),
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    Danhgia = Convert.ToInt32(item.Danhgia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [HttpPost]
        public void Post(Nguon nguon)
        {
            string ID = "PO";
            Nguon NguonLast = new Nguon();
            NguonLast = context.Nguons.OrderByDescending(r => r.MaNguon).FirstOrDefault();
            string temp = NguonLast.MaNguon.ToString().Substring(2);
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

            nguon.MaNguon = ID;

            Nguon NguonNeedAdd = new Nguon
            {
                MaNguon = nguon.MaNguon,
                Model = nguon.Model,
                HangSX = nguon.HangSX,
                CongSuat = Convert.ToInt32(nguon.CongSuat),
                HieuSuat = Convert.ToInt32(nguon.HieuSuat),
                Giaban = Convert.ToInt32(nguon.Giaban),
                Diem = Convert.ToInt32(nguon.Diem),
                Danhgia = Convert.ToInt32(nguon.Danhgia),
                URL = nguon.URL
            };

            if (nguon == null)
            {
                throw new ArgumentNullException();
            }
            context.Nguons.Add(NguonNeedAdd);
            context.SaveChanges();
        }

        [HttpPost]
        [Route("api/nguon/delete/{MaNguon}")]
        public void Delete(string MaNguon)
        {
            if (MaNguon == null)
                throw new ArgumentNullException();
            Nguon nguon = context.Nguons.SingleOrDefault(r => r.MaNguon == MaNguon);
            context.Nguons.Remove(nguon);
            context.SaveChanges();
        }

        [HttpPut]
        public IHttpActionResult Put(Nguon nguon)
        {
            if (nguon.MaNguon == null)
            {
                return BadRequest();
            }
            context.Entry(nguon).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/nguon/sort/{Price1:int}/{Price2:int}")]
        [HttpGet]
        public IEnumerable<Nguon> Sort(int Price1, int Price2)
        {
            List<Nguon> lstNguon = context.Nguons.ToList();
            List<Nguon> lstNguonNeed = new List<Nguon>();
            foreach (Nguon nguon in lstNguon)
                if (nguon.Giaban <= Price2 && nguon.Giaban >= Price1)
                    lstNguonNeed.Add(nguon);
            IList<Nguon> proList = new List<Nguon>();
            foreach (var item in lstNguonNeed)
            {
                proList.Add(new Nguon
                {
                    MaNguon = item.MaNguon,
                    Model = item.Model,
                    HangSX = item.HangSX,
                    CongSuat = Convert.ToInt32(item.CongSuat),
                    HieuSuat = Convert.ToInt32(item.HieuSuat),
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    Danhgia = Convert.ToInt32(item.Danhgia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("api/nguon/search/{NAME}")]
        [HttpGet]
        public IEnumerable<Nguon> Search(string NAME)
        {
            List<Nguon> lstNguon = new List<Nguon>();
            lstNguon = context.Nguons.SqlQuery($"Select * From Nguon Where Model like '%{NAME}%'").ToList();

            IList<Nguon> proList = new List<Nguon>();
            foreach (var item in lstNguon)
            {
                proList.Add(new Nguon
                {
                    MaNguon = item.MaNguon,
                    Model = item.Model,
                    HangSX = item.HangSX,
                    CongSuat = Convert.ToInt32(item.CongSuat),
                    HieuSuat = Convert.ToInt32(item.HieuSuat),
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    Danhgia = Convert.ToInt32(item.Danhgia),
                    URL = item.URL
                });
            }
            return proList;
        }
    }
}