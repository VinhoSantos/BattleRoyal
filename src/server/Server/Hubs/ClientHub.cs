using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class ClientHub : Hub
    {
        private readonly IHubContext<AdminHub> _adminHub;
        public int PlayerPosition { get; set; }

        public ClientHub(IHubContext<AdminHub> adminHub)
        {
            _adminHub = adminHub;
        }

        public async Task Connect(string name)
        {
            var connectionId = Context.ConnectionId;
            await _adminHub.Clients.All.SendAsync("ClientConnected", connectionId, name);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return _adminHub.Clients.All.SendAsync("ClientDisconnected", Context.ConnectionId);
        }

        public async Task PlayerInput(string name)
        {
            await Clients.Caller.SendAsync("PlayerMoved", name, PlayerPosition++);
        }
    }
}
