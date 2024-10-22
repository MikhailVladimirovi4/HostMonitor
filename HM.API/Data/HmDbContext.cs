using HM.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HM.API.Data
{
    public class HmDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public HmDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

//        public DbSet<LocalUser> LocalUsers => Set<LocalUser>();
        public DbSet<Device> Devices => Set<Device>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("HmDatabase"));
        }
    }
}
