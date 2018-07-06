using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BuildPC.Models;
using BuildPC.Controllers;

namespace BuildPC.Controllers
{
    [RoutePrefix("api/calculate")]
    
    public class CalculateController : ApiController
    {
        public class CHPCtemp
        {
            public string MaGPU;
            public string MaCPU;
            public string MaMain;
            public string MaRam;
            public string MaRam2;
            public string MaHDD;
            public string MaHDD2;
            public string MaCase;
            public string MaNguon;
            public int Giaban;
        }
        //tinh cau hinh phu hop voi gia tien
        [Route("{Giatien}/{MaCH}")]
        public IList<string> GetList(int Giatien, string MaCH)
        {
            IList<CHPCtemp> lstCHPC = new List<CHPCtemp>();

            CauHinhPC CHPC = new CauHinhPC();
            CHPC = new CauHinhPCController().GetByID(MaCH);

            int Giadu = Giatien - CHPC.Giaban;
            int Giasaumuagpu = 0;
            int Giasaumuacpu = 0;
            int Giasaumuamain = 0;
            int Giasaumuaram = 0;

            CPU CPU = new CPU();
            CPU = new CPUController().GetByID(CHPC.MaCPU);

            GPU GPU = new GPU();
            if (CHPC.MaGPU != null)
                GPU = new GPUController().GetByID(CHPC.MaGPU);
            else
                GPU = new GPUController().GetByID(CPU.Dohoa);

            Mainboard MAIN = new Mainboard();
            MAIN = new MainboardController().GetByID(CHPC.MaMain);

            RAM RAM = new RAM();
            RAM = new RAMController().GetByID(CHPC.MaRam);
            if (CHPC.MaRam2 != null)
            {
                RAM RAM2 = new RAM();
                RAM2 = new RAMController().GetByID(CHPC.MaRam);
            }

            if (CHPC.MaGPU != null)
            {
                IList<GPU> lstGpu = new List<GPU>();
                lstGpu = new GPUController().GetList(GPU.Diem, Giadu, GPU.Giaban).ToList();

                if (lstGpu.Count != 0)
                {
                    for (int i = 0; i < lstGpu.Count; i++)
                    {
                        Giasaumuagpu = Giadu - (lstGpu[i].Giaban - GPU.Giaban);

                        IList<CPU> lstCpu = new List<CPU>();
                        lstCpu = new CPUController().GetList(CPU.Diem, lstGpu[i].Diem, Giasaumuagpu, CPU.Giaban).ToList();

                        if (lstCpu.Count != 0)
                        {
                            for (int j = 0; j < lstCpu.Count; j++)
                            {
                                Giasaumuacpu = Giasaumuagpu - (lstCpu[j].Giaban - CPU.Giaban);

                                IList<Mainboard> lstMain = new List<Mainboard>();
                                lstMain = new MainboardController().GetList(lstCpu[j].Socket, lstGpu[i].PCI, Giasaumuacpu, MAIN.Giaban).ToList();

                                if (lstMain.Count != 0)
                                {
                                    for (int k = 0; k < lstMain.Count; k++)
                                    {
                                        Giasaumuamain = Giasaumuacpu - (lstMain[k].Giaban - MAIN.Giaban);

                                        if (CHPC.MaRam2 == null)
                                        {
                                            IList<RAM> lstRam = new List<RAM>();
                                            lstRam = new RAMController().GetList(Giasaumuamain, RAM.Giaban, RAM.DungLuong, lstMain[k].LoaiRamToiDa).ToList();

                                            if (lstRam.Count != 0)
                                            {
                                                for (int l = 0; l < lstRam.Count; l++)
                                                {
                                                    Giasaumuaram = Giasaumuamain - (lstRam[l].Giaban - RAM.Giaban);

                                                    lstCHPC.Add(new CHPCtemp
                                                    {
                                                        MaGPU = lstGpu[i].MaGPU,
                                                        MaCPU = lstCpu[j].MaCPU,
                                                        MaMain = lstMain[k].MaMain,
                                                        MaRam = lstRam[l].MaRam,
                                                        MaRam2 = null,
                                                        MaHDD = CHPC.MaHDD,
                                                        MaHDD2 = CHPC.MaHDD2,
                                                        MaCase = CHPC.MaCase,
                                                        MaNguon = CHPC.MaNguon,
                                                        Giaban = Giatien - Giasaumuaram
                                                    });

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                IList<GPU> lstGpu = new List<GPU>();
                lstGpu = new GPUController().GetList(GPU.Diem, Giadu, GPU.Giaban).ToList();

                if (lstGpu.Count != 0)
                {
                    for (int i = 0; i < lstGpu.Count; i++)
                    {
                        Giasaumuagpu = Giadu - (lstGpu[i].Giaban - GPU.Giaban);

                        if (lstGpu[i].HangChipset == "SX0004")
                        {
                            IList<CPU> lstCpu = new List<CPU>();
                            lstCpu = new CPUController().GetList2(CPU.Diem, lstGpu[i].MaGPU, Giasaumuagpu, CPU.Giaban).ToList();

                            if (lstCpu.Count != 0)
                            {
                                for (int j = 0; j < lstCpu.Count; j++)
                                {
                                    Giasaumuacpu = Giasaumuagpu - (lstCpu[j].Giaban - CPU.Giaban);

                                    IList<Mainboard> lstMain = new List<Mainboard>();
                                    lstMain = new MainboardController().GetList2(lstCpu[j].Socket, Giasaumuacpu, MAIN.Giaban).ToList();

                                    if (lstMain.Count != 0)
                                    {
                                        for (int k = 0; k < lstMain.Count; k++)
                                        {
                                            Giasaumuamain = Giasaumuacpu - (lstMain[k].Giaban - MAIN.Giaban);

                                            if (CHPC.MaRam2 == null)
                                            {
                                                IList<RAM> lstRam = new List<RAM>();
                                                lstRam = new RAMController().GetList(Giasaumuamain, RAM.Giaban, RAM.DungLuong, lstMain[k].LoaiRamToiDa).ToList();

                                                if (lstRam.Count != 0)
                                                {
                                                    for (int l = 0; l < lstRam.Count; l++)
                                                    {
                                                        Giasaumuaram = Giasaumuamain - (lstRam[l].Giaban - RAM.Giaban);

                                                        lstCHPC.Add(new CHPCtemp
                                                        {
                                                            MaGPU = lstGpu[i].MaGPU,
                                                            MaCPU = lstCpu[j].MaCPU,
                                                            MaMain = lstMain[k].MaMain,
                                                            MaRam = lstRam[l].MaRam,
                                                            MaRam2 = null,
                                                            MaHDD = CHPC.MaHDD,
                                                            MaHDD2 = CHPC.MaHDD2,
                                                            MaCase = CHPC.MaCase,
                                                            MaNguon = CHPC.MaNguon,
                                                            Giaban = Giatien - Giasaumuaram
                                                        });

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            IList<CPU> lstCpu = new List<CPU>();
                            lstCpu = new CPUController().GetList(CPU.Diem, lstGpu[i].Diem, Giasaumuagpu, CPU.Giaban).ToList();

                            if (lstCpu.Count != 0)
                            {
                                for (int j = 0; j < lstCpu.Count; j++)
                                {
                                    Giasaumuacpu = Giasaumuagpu - (lstCpu[j].Giaban - CPU.Giaban);

                                    IList<Mainboard> lstMain = new List<Mainboard>();
                                    lstMain = new MainboardController().GetList(lstCpu[j].Socket, lstGpu[i].PCI, Giasaumuacpu, MAIN.Giaban).ToList();

                                    if (lstMain.Count != 0)
                                    {
                                        for (int k = 0; k < lstMain.Count; k++)
                                        {
                                            Giasaumuamain = Giasaumuacpu - (lstMain[k].Giaban - MAIN.Giaban);

                                            if (CHPC.MaRam2 == null)
                                            {
                                                IList<RAM> lstRam = new List<RAM>();
                                                lstRam = new RAMController().GetList(Giasaumuamain, RAM.Giaban, RAM.DungLuong, lstMain[k].LoaiRamToiDa).ToList();

                                                if (lstRam.Count != 0)
                                                {
                                                    for (int l = 0; l < lstRam.Count; l++)
                                                    {
                                                        Giasaumuaram = Giasaumuamain - (lstRam[l].Giaban - RAM.Giaban);

                                                        lstCHPC.Add(new CHPCtemp
                                                        {
                                                            MaGPU = lstGpu[i].MaGPU,
                                                            MaCPU = lstCpu[j].MaCPU,
                                                            MaMain = lstMain[k].MaMain,
                                                            MaRam = lstRam[l].MaRam,
                                                            MaRam2 = null,
                                                            MaHDD = CHPC.MaHDD,
                                                            MaHDD2 = CHPC.MaHDD2,
                                                            MaCase = CHPC.MaCase,
                                                            MaNguon = CHPC.MaNguon,
                                                            Giaban = Giatien - Giasaumuaram
                                                        });

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (var a = 0; a <= lstCHPC.Count - 1; a++)
            {
                for (var b = 0; b < a; b++)
                {
                    CHPCtemp temp = new CHPCtemp();
                    if (lstCHPC[a].Giaban > lstCHPC[b].Giaban)
                    {
                        temp = lstCHPC[a];
                        lstCHPC[a] = lstCHPC[b];
                        lstCHPC[b] = temp;
                    }
                }
            }
            IList<CHPCtemp> lstCHPCResult = new List<CHPCtemp>();
            IList<string> lstName = new List<string>();
            if (lstCHPC.Count < 10)
            {
                for (int i = 0; i < lstCHPC.Count; i++)
                {
                    string Name = "";
                    Name = PostName(lstCHPC[i]);
                    lstName.Add(Name);
                }
                return lstName;
            }
            else
            {
                for (int i = 0; i < 10; i++)
                {
                    string Name = "";
                    Name = PostName(lstCHPC[i]);
                    lstName.Add(Name);
                }
                return lstName;
            }

        }

        //lay ten cac thanh phan cua 1 cau hinh
        [HttpPost]
        public string PostName(CHPCtemp CH)
        {
            GPU gpu = new GPU();
            gpu = new Controllers.GPUController().GetByID(CH.MaGPU);

            CPU cpu = new CPU();
            cpu = new Controllers.CPUController().GetByID(CH.MaCPU);

            Mainboard main = new Controllers.MainboardController().GetByID(CH.MaMain);

            RAM ram = new Controllers.RAMController().GetByID(CH.MaRam);

            RAM ram2 = new Controllers.RAMController().GetByID(CH.MaRam2);

            HDD hdd = new Controllers.HDDController().GetByID(CH.MaHDD);

            HDD hdd2 = new Controllers.HDDController().GetByID(CH.MaHDD2);

            Nguon nguon = new Controllers.NguonController().GetByID(CH.MaNguon);

            CasePC casepc = new Controllers.CasePCController().GetByID(CH.MaCase);

            string Name = "";
            Name += gpu.Model + '|' + cpu.Model + '|' + main.Model + '|' + ram.Model + '|' + ram2.Model + '|' + hdd.Model + '|' + hdd2.Model + '|' + nguon.Model + '|' + casepc.Model + '|' + CH.Giaban;
            return Name;
        }

        //tinh tong gia ban cua 1 cau hinh
        [HttpPost]
        [Route("postgia")]
        public int PostGia(CHPCtemp CH)
        {
            GPU gpu = new GPU();
            gpu = new Controllers.GPUController().GetByID(CH.MaGPU);

            CPU cpu = new CPU();
            cpu = new Controllers.CPUController().GetByID(CH.MaCPU);

            Mainboard main = new Controllers.MainboardController().GetByID(CH.MaMain);

            RAM ram = new Controllers.RAMController().GetByID(CH.MaRam);

            RAM ram2 = new Controllers.RAMController().GetByID(CH.MaRam2);

            HDD hdd = new Controllers.HDDController().GetByID(CH.MaHDD);

            HDD hdd2 = new Controllers.HDDController().GetByID(CH.MaHDD2);

            Nguon nguon = new Controllers.NguonController().GetByID(CH.MaNguon);

            CasePC casepc = new Controllers.CasePCController().GetByID(CH.MaCase);

            int gia = 0;
            gia += gpu.Giaban + cpu.Giaban + main.Giaban + ram.Giaban + ram2.Giaban + hdd.Giaban + hdd2.Giaban + nguon.Giaban + casepc.Giaban;
            return gia;
        }

        //kiem tra xem cpu va gpu co phu hop hay khong
        [HttpGet]
        [Route("checkcg/{MaCPU}/{MaGPU}")]
        public int CheckCG(string MaCPU, string MaGPU)
        {
            GPU gpu = new GPU();
            gpu = new Controllers.GPUController().GetByID(MaGPU);

            CPU cpu = new CPU();
            cpu = new Controllers.CPUController().GetByID(MaCPU);

            if (cpu.Diem <= gpu.Diem + 1000 && cpu.Diem >= gpu.Diem - 500)
                return 0;
            else
            {
                if (cpu.Diem < gpu.Diem)
                    return 1;
                else
                    return 2;
            }
        }

        //kiem tra xem cpu va mainboard co phu hop hay khong
        [HttpGet]
        [Route("checkcm/{MaCPU}/{MaMain}")]
        public bool CheckCM(string MaCPU, string MaMain)
        {
            Mainboard main = new Mainboard();
            main = new Controllers.MainboardController().GetByID(MaMain);

            CPU cpu = new CPU();
            cpu = new Controllers.CPUController().GetByID(MaCPU);

            if (cpu.Socket == main.Socket)
                return true;
            else
                return false;
        }

        //kiem tra xem gpu va mainboard co phu hop hay khong
        [HttpGet]
        [Route("checkgm/{MaGPU}/{MaMain}")]
        public bool CheckGM(string MaGPU, string MaMain)
        {
            GPU gpu = new GPU();
            gpu = new Controllers.GPUController().GetByID(MaGPU);

            Mainboard main = new Mainboard();
            main = new Controllers.MainboardController().GetByID(MaMain);

            if (gpu.PCI == main.PCI)
                return true;
            else
                return false;
        }

        //kiem tra xem ram va mainboard co phu hop hay khong
        [HttpGet]
        [Route("checkrm/{MaRam}/{MaMain}")]
        public bool CheckRM(string MaRam, string MaMain)
        {
            RAM ram = new RAM();
            ram = new Controllers.RAMController().GetByID(MaRam);

            Mainboard main = new Mainboard();
            main = new Controllers.MainboardController().GetByID(MaMain);

            if (ram.LoaiRam == main.LoaiRamToiDa)
                return true;
            else
                return false;
        }

        //nang cap cau hinh dua vao nhu cau cua nguoi dung
        [HttpPost]
        [Route("update/{Giatien}/{Nhucau}")]
        public IList<string> Update(CHPCtemp CH, string Giatien, string Nhucau)
        {
            GPU gpu = new GPU();
            gpu = new Controllers.GPUController().GetByID(CH.MaGPU);

            CPU cpu = new CPU();
            cpu = new Controllers.CPUController().GetByID(CH.MaCPU);

            Mainboard main = new Controllers.MainboardController().GetByID(CH.MaMain);

            RAM ram = new Controllers.RAMController().GetByID(CH.MaRam);

            int Tien = int.Parse(Giatien);

            if(Nhucau.Equals("CPU") == true)
            {
                IList<CPU> lstCPU = new List<CPU>();
                IList<string> lstCPUResult = new List<string>();
                lstCPU = new CPUController().GetListUpdate(cpu.Diem, gpu.Diem, Tien);
                for(int i = 0; i< lstCPU.Count(); i++)
                {
                    if (lstCPU[i].Socket == main.Socket)
                        lstCPUResult.Add(lstCPU[i].MaCPU);
                }
                return lstCPUResult;
            }
            else
            {
                if(Nhucau.Equals("GPU") == true)
                {
                    IList<GPU> lstGPU = new List<GPU>();
                    IList<string> lstGPUResult = new List<string>();
                    lstGPU = new GPUController().GetListUpdate(gpu.Diem, Tien);
                    for (int i = 0; i < lstGPU.Count(); i++)
                    {
                        if (lstGPU[i].PCI == main.PCI)
                            lstGPUResult.Add(lstGPU[i].MaGPU);
                    }
                    return lstGPUResult;
                }
                else
                {
                    IList<RAM> lstRAM = new List<RAM>();
                    IList<string> lstRAMResult = new List<string>();
                    lstRAM = new RAMController().GetListUpdate(Tien, ram.DungLuong,ram.LoaiRam);
                    for (int i = 0; i < lstRAM.Count(); i++)
                    {
                        if (lstRAM[i].LoaiRam == main.LoaiRamToiDa)
                            lstRAMResult.Add(lstRAM[i].MaRam);
                    }
                    return lstRAMResult;
                }
            }
        }
    }
}
