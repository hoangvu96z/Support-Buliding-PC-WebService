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
    public class LoaiRamController : ApiController
    {
          DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IList<LoaiRam> GetAllProduct()
        {
            IList<LoaiRam> proList = new List<LoaiRam>();
            var query = (from prods in context.LoaiRams select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new LoaiRam
                {
                    MaLoaiRam = item.MaLoaiRam,
                    TenLoaiRam = item.TenLoaiRam

                });
            }
            return proList;
        }

        public IList<LoaiRam> GetByID(string id)
        {
            IList<LoaiRam> proList = new List<LoaiRam>();
            var query = (from prods in context.LoaiRams where prods.MaLoaiRam == id select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new LoaiRam
                {
                    MaLoaiRam = item.MaLoaiRam,
                    TenLoaiRam = item.TenLoaiRam

                });
            }
            return proList;
        }
    }
}