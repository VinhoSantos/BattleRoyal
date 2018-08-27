using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Server.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class ClientHub : Hub
    {
        private readonly IHubContext<AdminHub> _adminHub;
        private static readonly ConnectionMapping Connections = new ConnectionMapping();
        private static readonly List<Player> ConnectedPlayers = new List<Player>();
        private static readonly GameState GameState = new GameState();
        private static readonly PlayerInfo PlayerInfo = new PlayerInfo();

        public ClientHub(IHubContext<AdminHub> adminHub)
        {
            _adminHub = adminHub;
        }

        public override Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;
            var playerCount = Connections.Count;

            var player = new Player
            {
                Id = connectionId,
                Name = $"Speler {playerCount + 1}",
                Vision = 2,
                Speed = 1,
                CoX = 10 + 5 * playerCount,
                CoY = 10 + 5 * playerCount
            };

            ConnectedPlayers.Add(player);

            Connections.Add(connectionId, player.Name);

            Console.WriteLine(Connections.Count);

            Thread.Sleep(1000);

            //_adminHub.Clients.All.SendAsync("NewPlayerConnected", connectionId);
            return Clients.Caller.SendAsync("ClientConnected", player.Name);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            Connections.Remove(connectionId);
            var player = ConnectedPlayers.SingleOrDefault(p => p.Id == connectionId);
            if (player != null)
            {

            }
            return _adminHub.Clients.All.SendAsync("PlayerDisconnected", Context.ConnectionId);
        }

        public async Task OnStartLevel(int levelNumber = 1)
        {
            var connectionId = Context.ConnectionId;
            using (var reader = new StreamReader($"{levelNumber}.json"))
            {
                string json = reader.ReadToEnd();
                var level = JsonConvert.DeserializeObject<Level>(json);

                GameState.Level = level;

                await Clients.Caller.SendAsync("LevelStarted", level, connectionId);
            }
        }

        public async Task OnPlayerInput(Move move)
        {
            var connectionId = Context.ConnectionId;
            var me = GameState.PlayerInfo.Me;

            switch (move)
            {
                case Move.Up:
                    me.CoY -= me.Speed;
                    break;
                case Move.Down:
                    me.CoY += me.Speed;
                    break;
                case Move.Left:
                    me.CoX -= me.Speed;
                    break;
                case Move.Right:
                    me.CoX += me.Speed;
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(move), move, null);
            }

            GameState.PlayerInfo.Others = ConnectedPlayers.Where(p => p.Id != connectionId).ToList();
            
            await Clients.Caller.SendAsync("NewStateReceived", GameState.PlayerInfo);
        }
    }
}
