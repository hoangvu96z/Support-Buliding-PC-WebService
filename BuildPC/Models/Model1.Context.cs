﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BuildPC.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DOANCNEntities : DbContext
    {
        public DOANCNEntities()
            : base("name=DOANCNEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CasePC> CasePCs { get; set; }
        public virtual DbSet<CauHinhPC> CauHinhPCs { get; set; }
        public virtual DbSet<CPU> CPUs { get; set; }
        public virtual DbSet<DanhGia> DanhGias { get; set; }
        public virtual DbSet<DongCPU> DongCPUs { get; set; }
        public virtual DbSet<GPU> GPUs { get; set; }
        public virtual DbSet<HangSX> HangSXes { get; set; }
        public virtual DbSet<HDD> HDDs { get; set; }
        public virtual DbSet<LoaiRam> LoaiRams { get; set; }
        public virtual DbSet<Mainboard> Mainboards { get; set; }
        public virtual DbSet<Nguon> Nguons { get; set; }
        public virtual DbSet<PhanMem> PhanMems { get; set; }
        public virtual DbSet<PhanQuyen> PhanQuyens { get; set; }
        public virtual DbSet<RAM> RAMs { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}