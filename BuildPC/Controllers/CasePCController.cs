using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BuildPC.Models;
namespace BuildPC.Controllers
{
    public class CasePCController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IEnumerable<CasePC> GetAllProduct()
        {
            IList<CasePC> proList = new List<CasePC>();
            var query = (from prods in context.CasePCs select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new CasePC
                {
                    MaCase = item.MaCase,
                    Model = item.Model,
                    ChieuDai = Convert.ToInt32(item.ChieuDai),
                    ChieuRong = Convert.ToInt32(item.ChieuRong),
                    ChieuCao = Convert.ToInt32(item.ChieuCao),
                    HangSX = item.HangSX,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        public CasePC GetByID(string id)
        {
            CasePC proList = new CasePC();
            var query = (from prods in context.CasePCs where prods.MaCase == id select prods).ToList();
            foreach (var item in query)
            {
                proList = (new CasePC
                {
                    MaCase = item.MaCase,
                    Model = item.Model,
                    ChieuDai = Convert.ToInt32(item.ChieuDai),
                    ChieuRong = Convert.ToInt32(item.ChieuRong),
                    ChieuCao = Convert.ToInt32(item.ChieuCao),
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
        public void Post(CasePC casepc)
        {
            string ID = "CS";
            CasePC CasePCLast = new CasePC();
            CasePCLast = context.CasePCs.OrderByDescending(r => r.MaCase).FirstOrDefault();
            string temp = CasePCLast.MaCase.ToString().Substring(2);
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

            casepc.MaCase = ID;

            CasePC CasePCNeedAdd = new CasePC
            {
                MaCase = casepc.MaCase,
                Model = casepc.Model,
                ChieuDai = Convert.ToInt32(casepc.ChieuDai),
                ChieuRong = Convert.ToInt32(casepc.ChieuRong),
                ChieuCao = Convert.ToInt32(casepc.ChieuCao),
                HangSX = casepc.HangSX,
                Giaban = Convert.ToInt32(casepc.Giaban),
                Diem = Convert.ToInt32(casepc.Diem),
                DanhGia = Convert.ToInt32(casepc.DanhGia),
                URL = casepc.URL
            };

            if (casepc == null)
            {
                throw new ArgumentNullException();
            }
            context.CasePCs.Add(CasePCNeedAdd);
            context.SaveChanges();
        }

        [HttpPost]
        [Route("api/casepc/delete/{MaCase}")]
        public void Delete(string MaCase)
        {
            if (MaCase == null)
                throw new ArgumentNullException();
            CasePC casepc = context.CasePCs.SingleOrDefault(r => r.MaCase == MaCase);
            context.CasePCs.Remove(casepc);
            context.SaveChanges();
        }

        [HttpPut]
        public IHttpActionResult Put(CasePC casepc)
        {
            if (casepc.MaCase == null)
            {
                return BadRequest();
            }
            context.Entry(casepc).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/casepc/sort/{Price1:int}/{Price2:int}")]
        [HttpGet]
        public IEnumerable<CasePC> Sort(int Price1, int Price2)
        {
            List<CasePC> lstCasePC = context.CasePCs.ToList();
            List<CasePC> lstCasePCNeed = new List<CasePC>();
            foreach (CasePC casepc in lstCasePC)
                if (casepc.Giaban <= Price2 && casepc.Giaban >= Price1)
                    lstCasePCNeed.Add(casepc);
            IList<CasePC> proList = new List<CasePC>();
            foreach (var item in lstCasePCNeed)
            {
                proList.Add(new CasePC
                {
                    MaCase = item.MaCase,
                    Model = item.Model,
                    ChieuDai = Convert.ToInt32(item.ChieuDai),
                    ChieuRong = Convert.ToInt32(item.ChieuRong),
                    ChieuCao = Convert.ToInt32(item.ChieuCao),
                    HangSX = item.HangSX,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("api/casepc/search/{NAME}")]
        [HttpGet]
        public IEnumerable<CasePC> Search(string NAME)
        {
            List<CasePC> lstCasePC = new List<CasePC>();
            lstCasePC = context.CasePCs.SqlQuery($"Select * From CasePC Where Model like '%{NAME}%'").ToList();

            IList<CasePC> proList = new List<CasePC>();
            foreach (var item in lstCasePC)
            {
                proList.Add(new CasePC
                {
                    MaCase = item.MaCase,
                    Model = item.Model,
                    ChieuDai = Convert.ToInt32(item.ChieuDai),
                    ChieuRong = Convert.ToInt32(item.ChieuRong),
                    ChieuCao = Convert.ToInt32(item.ChieuCao),
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
