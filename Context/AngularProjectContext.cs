using ChatAngularProject.Models.Db;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAngularProject.Context
{
    public class AngularProjectContext : DbContext
    {
        public AngularProjectContext(DbContextOptions<AngularProjectContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Post>().HasData(
                new Post { Id = 1, Title = "Pierwszy post", Text = "Post inicjujacy" },
                new Post { Id = 2, Title = "Drugi post", Text = "Post dwa" });
        }

        public DbSet<Post> Posts { get; set; }
    }
}
