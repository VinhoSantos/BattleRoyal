using System.Collections.Generic;
using System.Drawing;

namespace Server.Model
{
    public class GameState
    {
        public Level Level { get; set; }
        public PlayerInfo PlayerInfo { get; set; }
    }

    public class Level
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Difficulty Difficulty { get; set; }
        public int MaxPlayers { get; set; }
        public World World { get; set; }
    }

    public class World
    {
        public Point[] Walls { get; set; }
        public Point EndPoint { get; set; }
    }

    public class PlayerInfo
    {
        public Player Me { get; set; }
        public List<Player> Others { get; set; }
    }

    public enum Difficulty
    {
        Easy = 1,
        Normal = 2,
        Hard = 3,
        Expert = 4
    }

    public enum Move
    {
        Left = 1,
        Up = 2,
        Right = 3,
        Down = 4
    }
}
