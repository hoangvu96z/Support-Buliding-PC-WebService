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
    public class PhanMemController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IEnumerable<PhanMem> GetAllProduct()
        {
            IList<PhanMem> proList = new List<PhanMem>();
            var query = (from prods in context.PhanMems select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new PhanMem
                {
                    MaPM = item.MaPM,
                    TenPM = item.TenPM,
                    CHToiThieu = item.CHToiThieu,
                    CHKhuyenNghi = item.CHKhuyenNghi,
                    LoaiPM = item.LoaiPM

                });
            }
            return proList;
        }

        public IEnumerable<PhanMem> GetByID(string id)
        {
            IList<PhanMem> proList = new List<PhanMem>();
            var query = (from prods in context.PhanMems where prods.LoaiPM == id select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new PhanMem
                {
                    MaPM = item.MaPM,
                    TenPM = item.TenPM,
                    CHToiThieu = item.CHToiThieu,
                    CHKhuyenNghi = item.CHKhuyenNghi,
                    LoaiPM = item.LoaiPM
                });
            }
            return proList;
        }
    }
}