﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Dal
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class FINAL_PROJECTEntities : DbContext
    {
        public FINAL_PROJECTEntities()
            : base("name=FINAL_PROJECTEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CLIENTS> CLIENTS { get; set; }
        public virtual DbSet<PRODUCTS> PRODUCTS { get; set; }
        public virtual DbSet<RECIPES> RECIPES { get; set; }
        public virtual DbSet<SCHEDULES> SCHEDULES { get; set; }
        public virtual DbSet<SAVED_RECIPES> SAVED_RECIPES { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
    }
}
