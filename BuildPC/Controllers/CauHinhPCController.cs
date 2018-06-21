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
    public class CauHinhPCController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IEnumerable<CauHinhPC> GetAllProduct()
        {
            IList<CauHinhPC> proList = new List<CauHinhPC>();
            var query = (from prods in context.CauHinhPCs select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new CauHinhPC
                {
                    MaCH = item.MaCH,
                    MaCPU = item.MaCPU,
                    MaMain = item.MaMain,
                    MaRam = item.MaRam,
                    MaRam2 = item.MaRam2,
                    MaHDD = item.MaHDD,
                    MaHDD2 = item.MaHDD2,
                    MaCase = item.MaCase,
                    MaNguon = item.MaNguon,
                    MaGPU = item.MaGPU,
                    Diem = Convert.ToInt32(item.Diem),
                    Giaban = Convert.ToInt32(item.Giaban)
                });
            }
            return proList;
        }

        public CauHinhPC GetByID(string id)
        {
            CauHinhPC proList = new CauHinhPC();
            var query = (from prods in context.CauHinhPCs where prods.MaCH == id select prods).ToList();
            foreach (var item in query)
            {
                proList = new CauHinhPC
                {
                    MaCH = item.MaCH,
                    MaCPU = item.MaCPU,
                    MaMain = item.MaMain,
                    MaRam = item.MaRam,
                    MaRam2 = item.MaRam2,
                    MaHDD = item.MaHDD,
                    MaHDD2 = item.MaHDD2,
                    MaCase = item.MaCase,
                    MaNguon = item.MaNguon,
                    MaGPU = item.MaGPU,
                    Diem = Convert.ToInt32(item.Diem),
                    Giaban = Convert.ToInt32(item.Giaban)
                };
            }
            return proList;
        }
    }
}