using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using BuildPC.Models;

namespace BuildPC.Controllers
{
    [RoutePrefix("api/cpu")]
    public class CPUController : ApiController
    {

        DOANCNEntities context = new DOANCNEntities();
        //DBProductDataContext context = new DBProductDataContext();
        // GET api/values
        public IList<CPU> GetAllProduct()
        {
            IList<CPU> proList = new List<CPU>();
            var query = (from prods in context.CPUs select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket =item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        public CPU GetByID(string id)
        {
            CPU CPU = new CPU();
            var query = (from prods in context.CPUs where prods.MaCPU == id select prods).ToList();
            foreach (var item in query)
            {
                CPU = new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                };
            }
            return CPU;
        }

        [Route("getlist/{DiemCPU}/{DiemGPU}/{Tiendu}/{Giaban}")]
        public IList<CPU> GetList(int DiemCPU, int DiemGPU, int Tiendu, int Giaban)
        {
            IList<CPU> proList = new List<CPU>();
            var query = (from prods in context.CPUs where (prods.Diem <=DiemGPU+1000 &&prods.Diem>=DiemGPU-500)&&(prods.Diem>=DiemCPU) && (prods.Giaban - Giaban <= Tiendu)  select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("getlist2/{DiemCPU}/{MaGPU}/{Tiendu}/{Giaban}")]
        public IList<CPU> GetList2(int DiemCPU, string MaGPU, int Tiendu, int Giaban)
        {
            IList<CPU> proList = new List<CPU>();
            var query = (from prods in context.CPUs where (prods.Dohoa == MaGPU) && (prods.Diem >= DiemCPU) && (prods.Giaban - Giaban <= Tiendu) select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [HttpPost]
        public void Post(CPU cpu)
        {
            string ID = "CP";
            CPU CpuLast = new CPU();
            CpuLast = context.CPUs.OrderByDescending(r => r.MaCPU).FirstOrDefault();
            string temp = CpuLast.MaCPU.ToString().Substring(2);
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

            cpu.MaCPU = ID;

            CPU CPUNeedAdd = new CPU
            {
                MaCPU = cpu.MaCPU,
                HangSX = cpu.HangSX,
                Model = cpu.Model,
                Socket = cpu.Socket,
                SoNhan = Convert.ToInt32(cpu.SoNhan),
                SoLuong = Convert.ToInt32(cpu.SoLuong),
                XungNhip = Convert.ToDouble(cpu.XungNhip),
                Dohoa = cpu.Dohoa,
                DongCPU = cpu.DongCPU,
                Cache = cpu.Cache,
                Giaban = Convert.ToInt32(cpu.Giaban),
                Diennang = Convert.ToInt32(cpu.Diennang),
                Diem = Convert.ToInt32(cpu.Diem),
                DanhGia = Convert.ToInt32(cpu.DanhGia),
                URL = cpu.URL
            };

            if (cpu == null)
            {
                throw new ArgumentNullException();
            }
            context.CPUs.Add(CPUNeedAdd);
            context.SaveChanges();
        }

        [HttpPost]
        [Route("delete/{MaCPU}")]
        public void Delete(string MaCPU)
        {
            if (MaCPU == null)
                throw new ArgumentNullException();
            CPU cpu = context.CPUs.SingleOrDefault(r => r.MaCPU == MaCPU);
            context.CPUs.Remove(cpu);
            context.SaveChanges();
        }

        [HttpPut]
        public IHttpActionResult Put(CPU cpu)
        {
            if (cpu.MaCPU == null)
            {
                return BadRequest();
            }
            context.Entry(cpu).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("sort/{Price1:int}/{Price2:int}")]
        [HttpGet]
        public IList<CPU> Sort(int Price1, int Price2)
        {
            List<CPU> lstCPU = context.CPUs.ToList();
            List<CPU> lstCPUNeed = new List<CPU>();
            foreach (CPU cpu in lstCPU)
                if (cpu.Giaban <= Price2 && cpu.Giaban >= Price1)
                    lstCPUNeed.Add(cpu);
            IList<CPU> proList = new List<CPU>();
            foreach (var item in lstCPUNeed)
            {
                proList.Add(new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("search/{NAME}")]
        [HttpGet]
        public IList<CPU> Search(string NAME)
        {
            List<CPU> lstCPU = new List<CPU>();
            lstCPU = context.CPUs.SqlQuery($"Select * From CPU Where Model like '%{NAME}%'").ToList();

            IList<CPU> proList = new List<CPU>();
            foreach (var item in lstCPU)
            {
                proList.Add(new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("orderby")]
        [HttpGet]
        public IList<CPU> Top50()
        {
            List<CPU> lstCPU = context.CPUs.ToList();
            List<CPU> lstCPUNeed = lstCPU.OrderByDescending(c => c.Diem).Take(50).ToList();
            IList<CPU> proList = new List<CPU>();
            foreach (var item in lstCPUNeed)
            {
                proList.Add(new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

        [Route("getlistupdate/{DiemCPU}/{DiemGPU}/{Giatien}")]
        public IList<CPU> GetListUpdate(int DiemCPU, int DiemGPU, int Giatien)
        {
            IList<CPU> proList = new List<CPU>();
            var query = (from prods in context.CPUs where (prods.Diem <= DiemGPU + 1000 && prods.Diem >= DiemGPU - 500) && (prods.Diem > DiemCPU) && (prods.Giaban <= Giatien) select prods).ToList();
            foreach (var item in query)
            {
                proList.Add(new CPU
                {
                    MaCPU = item.MaCPU,
                    HangSX = item.HangSX,
                    Model = item.Model,
                    Socket = item.Socket,
                    SoNhan = Convert.ToInt32(item.SoNhan),
                    SoLuong = Convert.ToInt32(item.SoLuong),
                    XungNhip = Convert.ToDouble(item.XungNhip),
                    Dohoa = item.Dohoa,
                    DongCPU = item.DongCPU,
                    Cache = item.Cache,
                    Giaban = Convert.ToInt32(item.Giaban),
                    Diennang = Convert.ToInt32(item.Diennang),
                    Diem = Convert.ToInt32(item.Diem),
                    DanhGia = Convert.ToInt32(item.DanhGia),
                    URL = item.URL
                });
            }
            return proList;
        }

    }
}
