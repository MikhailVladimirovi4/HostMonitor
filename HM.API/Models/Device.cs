namespace HM.API.Models
{
    public class Device
    {

        public Guid Id { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public string IpAddress { get; init; }
        public string Note { get; init; } = string.Empty;    
        public DateTime CreatedAt { get; init; }

        public Device(string title, string description, string ipAddress)
        {
            Title = title;
            Description = description;
            IpAddress = ipAddress;
            CreatedAt = DateTime.Now;
        }
    }
}
