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
    public class PhanQuyensController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IList<PhanQuyen> GetAllProduct()
        {
            IList<PhanQuyen> proList = new List<PhanQuyen>();
            var query = (from prods in context.PhanQuyens select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new PhanQuyen
                {
                    MaPQ = item.MaPQ,
                    TenPQ = item.TenPQ,
                    CodePQ = item.CodePQ
                 

                });
            }
            return proList;
        }

        public IList<PhanQuyen> GetByID(string id)
        {
            IList<PhanQuyen> proList = new List<PhanQuyen>();
            var query = (from prods in context.PhanQuyens where prods.MaPQ == id select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new PhanQuyen
                {
                    MaPQ = item.MaPQ,
                    TenPQ = item.TenPQ,
                    CodePQ = item.CodePQ
                });
            }
            return proList;
        }
    }
}