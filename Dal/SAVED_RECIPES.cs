//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class SAVED_RECIPES
    {
        public string MAIL { get; set; }
        public string RECIPE_ID { get; set; }
        public string RECIPE_TITLE { get; set; }
        public string RECIPE_IMAGE { get; set; }
        public string RECIPE_SUMMARY { get; set; }
        public Nullable<int> READY_IN_MINUTES { get; set; }
        public Nullable<int> SERVINGS { get; set; }
        public Nullable<int> NUM_LIKES { get; set; }
        public Nullable<double> RATING { get; set; }
    
        public virtual CLIENTS CLIENTS { get; set; }
    }
}
