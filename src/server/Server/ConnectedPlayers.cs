using System.Collections.Generic;

namespace Server
{
    public class ConnectionMapping
    {
        private readonly Dictionary<string, string> _connections = new Dictionary<string, string>();

        public int Count => _connections.Count;

        public void Add(string connectionId, string name)
        {
            lock (_connections)
            {
                if (!_connections.TryGetValue(connectionId, out var _))
                {
                    _connections.Add(connectionId, name);
                }
            }
        }

        public string GetPlayerName(string connectionId)
        {
            lock (_connections)
            {
                return _connections.TryGetValue(connectionId, out var name) 
                    ? name
                    : null;
            }
        }

        public void Remove(string connectionId)
        {
            lock (_connections)
            {
                if (_connections.TryGetValue(connectionId, out var _))
                {
                    _connections.Remove(connectionId);
                }
            }
        }
    }
}
