using Microsoft.AspNetCore.SignalR;
using Server.Model;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class ClientHub : Hub
    {
        private readonly IHubContext<AdminHub> _adminHub;
        private readonly List<Player> _connectedPlayers;

        public ClientHub(IHubContext<AdminHub> adminHub)
        {
            _adminHub = adminHub;
            _connectedPlayers = new List<Player>();
        }

        public override Task OnConnectedAsync()
        {
            _connectedPlayers.Add(new Player
            {
                Id = Context.ConnectionId
            });

            Thread.Sleep(3000);

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return _adminHub.Clients.All.SendAsync("ClientDisconnected", Context.ConnectionId);
        }

        public async Task Connect(string name)
        {
            var connectionId = Context.ConnectionId;
            await _adminHub.Clients.All.SendAsync("ClientConnected", connectionId, name);
        }

        public async Task OnStartLevel(int level = 1)
        {

            await Clients.Caller.SendAsync("");
        }

        public async Task OnPlayerInput(string name)
        {
            await Clients.Caller.SendAsync("PlayerMoved", name);
        }
    }
}
