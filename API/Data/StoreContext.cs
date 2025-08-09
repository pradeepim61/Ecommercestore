using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Id = "64e02633-ca13-4c5c-9a4d-5db6704bd380", Name = "Member", NormalizedName ="MEMBER" },
            new IdentityRole { Id = "71c225f7-944c-4db6-8a1c-3d7487014076", Name = "Admin", NormalizedName="ADMIN" }
        );
    }

}

