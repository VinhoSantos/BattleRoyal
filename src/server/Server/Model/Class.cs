using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Model
{
    public class GameState
    {
        public Level Level { get; set; }
        public List<Player> Players { get; set; }
    }

    public class Level
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Difficulty Difficulty { get; set; }
        public World World { get; set; }
    }

    public class World
    {
        public Point[] Walls { get; set; }
        public Player Player { get; set; }
        public Player[] OtherPlayers { get; set; }
        public Point EndPoint { get; set; }
    }

    public enum Difficulty
    {
        Easy = 1,
        Normal = 2,
        Hard = 3,
        Expert = 4
    }
}
