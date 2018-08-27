using Microsoft.AspNetCore.SignalR;

namespace Server.Hubs
{
    public class AdminHub : Hub
    {
        private readonly IHubContext<ClientHub> _clientHub;

        public AdminHub(IHubContext<ClientHub> clientHub)
        {
            _clientHub = clientHub;
        }
    }
}
