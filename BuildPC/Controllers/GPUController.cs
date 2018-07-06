using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BuildPC.Models;

namespace BuildPC.Controllers
{
    [RoutePrefix("api/gpu")]
    public class GPUController : ApiController
    {
        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IList<GPU> GetAllProduct()
        {
            IList<GPU> proList = new List<GPU>();
            var query = (from prods in context.GPUs select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }

        public GPU GetByID(string id)
        {
            GPU proList = new GPU();
            var query = (from prods in context.GPUs where prods.MaGPU == id select prods).ToList();
            foreach (var item in query)
            {
                proList = (new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    VGA = item.VGA,
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }

        [HttpGet]
        [Route("GetAllProduct2")]
        public IList<GPU> GetAllProduct2()
        {
            IList<GPU> proList = new List<GPU>();
            var query = (from prods in context.GPUs where (prods.HangChipset.Equals("SX0004") == false) select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("getlist/{Diem}/{Tiendu}/{Giaban}")]
        public IList<GPU> GetList(int Diem, int Tiendu, int Giaban)
        {
            IList<GPU> proList = new List<GPU>();
            var query = (from prods in context.GPUs where (prods.Diem >= Diem) && (prods.Giaban - Giaban <=  Tiendu)  select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }

        [HttpPost]
        public void Post(GPU gpu)
        {
            string ID = "GP";
            GPU GPULast = new GPU();
            GPULast = context.GPUs.OrderByDescending(r => r.MaGPU).FirstOrDefault();
            string temp = GPULast.MaGPU.ToString().Substring(2);
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

            gpu.MaGPU = ID;

            GPU GPUNeedAdd = new GPU
            {
                MaGPU = gpu.MaGPU,
                HangSX = gpu.HangSX,
                HangChipset = gpu.HangSX,
                Model = gpu.Model,
                PCI = gpu.PCI,
                BoNho = Convert.ToInt32(gpu.BoNho),
                LoaiRam = gpu.LoaiRam,
                DienNang = Convert.ToInt32(gpu.DienNang),
                Diem = Convert.ToInt32(gpu.Diem),
                DanhGia = Convert.ToInt32(gpu.DanhGia),
                Giaban = Convert.ToInt32(gpu.Giaban),
                URL = gpu.URL
            };

            if (gpu == null)
            {
                throw new ArgumentNullException();
            }
            context.GPUs.Add(GPUNeedAdd);
            context.SaveChanges();
        }

        [HttpPost]
        [Route("delete/{MaGPU}")]
        public void Delete(string MaGPU)
        {
            if (MaGPU == null)
                throw new ArgumentNullException();
            GPU gpu = context.GPUs.SingleOrDefault(r => r.MaGPU == MaGPU);
            context.GPUs.Remove(gpu);
            context.SaveChanges();
        }

        [HttpPut]
        public IHttpActionResult Put(GPU gpu)
        {
            if (gpu.MaGPU == null)
            {
                return BadRequest();
            }
            context.Entry(gpu).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("sort/{Price1:int}/{Price2:int}")]
        [HttpGet]
        public IList<GPU> Sort(int Price1, int Price2)
        {
            List<GPU> lstGPU = context.GPUs.ToList();
            List<GPU> lstGPUNeed = new List<GPU>();
            foreach (GPU gpu in lstGPU)
                if (gpu.Giaban <= Price2 && gpu.Giaban >= Price1)
                    lstGPUNeed.Add(gpu);
            IList<GPU> proList = new List<GPU>();
            foreach (var item in lstGPUNeed)
            {
                proList.Add(new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("search/{NAME}")]
        [HttpGet]
        public IList<GPU> Search(string NAME)
        {
            List<GPU> lstGPU = new List<GPU>();
            lstGPU = context.GPUs.SqlQuery($"Select * From GPU Where Model like '%{NAME}%'").ToList();

            IList<GPU> proList = new List<GPU>();
            foreach (var item in lstGPU)
            {
                proList.Add(new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("orderby")]
        [HttpGet]
        public IList<GPU> Top50()
        {
            List<GPU> lstGPU = context.GPUs.ToList();
            List<GPU> lstGPUNeed = lstGPU.OrderByDescending(c => c.Diem).Take(50).ToList();
            IList<GPU> proList = new List<GPU>();
            foreach (var item in lstGPUNeed)
            {
                proList.Add(new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("getlistupdate/{Diem}/{Giatien}")]
        public IList<GPU> GetListUpdate(int Diem, int Giatien)
        {
            IList<GPU> proList = new List<GPU>();
            var query = (from prods in context.GPUs where (prods.Diem > Diem) && (prods.Giaban <= Giatien) select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new GPU
                {
                    MaGPU = item.MaGPU,
                    HangSX = item.HangSX,
                    HangChipset = item.HangSX,
                    Model = item.Model,
                    PCI = item.PCI,
                    BoNho = Convert.ToInt32(item.BoNho),
                    LoaiRam = item.LoaiRam,
                    DienNang = Convert.ToInt32(item.DienNang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    Giaban = Convert.ToInt32(item.Giaban),
                    URL = item.URL
                });
            }
            return proList;
        }
    }
}
