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
    public class HangSXController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IEnumerable<HangSX> GetAllProduct()
        {
            IList<HangSX> proList = new List<HangSX>();
            var query = (from prods in context.HangSXes select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new HangSX
                {
                    MaHSX = item.MaHSX,
                    TenHang = item.TenHang
                    
                });
            }
            return proList;
        }

        public IEnumerable<HangSX> GetByID(string id)
        {
            IList<HangSX> proList = new List<HangSX>();
            var query = (from prods in context.HangSXes where prods.MaHSX == id select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new HangSX
                {
                    MaHSX = item.MaHSX,
                    TenHang = item.TenHang

                });
            }
            return proList;
        }
    }
}