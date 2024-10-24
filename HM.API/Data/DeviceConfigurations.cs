using HM.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HM.API.Data
{
    public class DeviceConfigurations : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(d => d.IpAddress)
               .IsRequired();

            builder.Property(d => d.Title)
                .IsRequired();

            builder.Property(d => d.Description)
                .IsRequired();

            builder.Property(d => d.Note)
                .IsRequired();

            builder.Property(d => d.CreatedAt)
               .IsRequired();
        }
    }
}
