namespace HM.API.Models
{
    public class Device
    {
        public Guid Id { get; init; }
        public string IpAddress { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public string Note { get; init; } = string.Empty;    
        public DateTime CreatedAt { get; init; }

        public Device(string ipAddress, string title, string description)
        {
            Id = Guid.NewGuid();
            IpAddress = ipAddress;
            Title = title;
            Description = description;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
