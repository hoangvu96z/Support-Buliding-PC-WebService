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
    public class DanhGiaController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IList<DanhGia> GetAllProduct()
        {
            IList<DanhGia> proList = new List<DanhGia>();
            var query = (from prods in context.DanhGias select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new DanhGia
                {
                    MaDanhGia = item.MaDanhGia,
                    MaUser = item.MaUser,
                    TGDanhGia = item.TGDanhGia,
                    DiemTong = Convert.ToInt32(item.DiemTong),
                    DiemCPU = Convert.ToInt32(item.DiemCPU),
                    MaCPU = item.MaCPU,
                    DiemGPU = Convert.ToInt32(item.DiemGPU),
                    MaGPU = item.MaGPU,
                    DiemMain = Convert.ToInt32(item.DiemMain),
                    MaMain = item.MaMain,
                    DiemHDD = Convert.ToInt32(item.DiemHDD),
                    MaHDD = item.MaHDD,
                    DiemRam = Convert.ToInt32(item.DiemRam),
                    MaRam = item.MaRam,
                    Binhluan = item.Binhluan
                });
            }
            return proList;
        }

        public IList<DanhGia> GetByID(string id)
        {
            IList<DanhGia> proList = new List<DanhGia>();
            var query = (from prods in context.DanhGias where prods.MaDanhGia == id select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new DanhGia
                {
                    MaDanhGia = item.MaDanhGia,
                    MaUser = item.MaUser,
                    TGDanhGia = item.TGDanhGia,
                    DiemTong = Convert.ToInt32(item.DiemTong),
                    DiemCPU = Convert.ToInt32(item.DiemCPU),
                    MaCPU = item.MaCPU,
                    DiemGPU = Convert.ToInt32(item.DiemGPU),
                    MaGPU = item.MaGPU,
                    DiemMain = Convert.ToInt32(item.DiemMain),
                    MaMain = item.MaMain,
                    DiemHDD = Convert.ToInt32(item.DiemHDD),
                    MaHDD = item.MaHDD,
                    DiemRam = Convert.ToInt32(item.DiemRam),
                    MaRam = item.MaRam,
                    Binhluan = item.Binhluan
                });
            }
            return proList;
        }
    }
}