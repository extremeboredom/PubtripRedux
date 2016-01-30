using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace pubtrip_redux.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Pub> Pubs { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Attendee> Attendees { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<Attendee>()
                   .HasOne(a => a.User)
                   .WithMany(u => u.Attending)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
