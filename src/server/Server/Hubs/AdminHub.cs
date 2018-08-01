using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
