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

        [Route("api/calculate/{Giatien}/{MaCH}")]
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

        [HttpPost]
        [Route("api/calculate/postgia")]
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

        [HttpGet]
        [Route("api/calculate/check/{MaCPU}/{MaGPU}")]
        public bool Check(string MaCPU, string MaGPU)
        {
            GPU gpu = new GPU();
            gpu = new Controllers.GPUController().GetByID(MaGPU);

            CPU cpu = new CPU();
            cpu = new Controllers.CPUController().GetByID(MaCPU);

            if (cpu.Diem <= gpu.Diem + 1000 && cpu.Diem >= gpu.Diem - 500)
                return true;
            else
                return false;
        }
    }
}
