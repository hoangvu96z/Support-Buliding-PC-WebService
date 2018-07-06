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
    public class DongCPUController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IList<DongCPU> GetAllProduct()
        {
            IList<DongCPU> proList = new List<DongCPU>();
            var query = (from prods in context.DongCPUs select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new DongCPU
                {
                    MaDongCPU = item.MaDongCPU,
                    TenDongCPU = item.TenDongCPU
                });
            }
            return proList;
        }

        public IList<DongCPU> GetByID(string id)
        {
            IList<DongCPU> proList = new List<DongCPU>();
            var query = (from prods in context.DongCPUs where prods.MaDongCPU == id select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new DongCPU
                {
                    MaDongCPU = item.MaDongCPU,
                    TenDongCPU = item.TenDongCPU
                });
            }
            return proList;
        }
    }
}