using System.Linq;
using NUnit.Framework;

namespace Tests
{
    public class TestingSomething
    {
        [Test]
        public void GameIsNotOverWhenGameStarts()
        {
            var fields = new[] { ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' };
            Assert.That(false, Is.EqualTo(GameIsOver(fields)));
        }

        [Test]
        public void GameIsNotOverWhenAllFieldsNotTaken()
        {
            var fields = new[] {'X', 'O', 'O', 'X', ' ', 'O', 'X', 'O', 'O'};
            Assert.That(false, Is.EqualTo(GameIsOver(fields)));
        }

        [Test]
        public void GameIsOverWhenAllFieldsTaken()
        {
            var fields = new[] {'X', 'O', 'O', 'X', 'O', 'O', 'X', 'O', 'O'};
            Assert.That(true, Is.EqualTo(GameIsOver(fields)));
        }

        private static bool GameIsOver(char[] fields)
        {
            return !fields.Contains(' ');
        }

        // a game is over when all fields in a column are taken by a player
        // a game is over when all fields in a row are taken by a player
        // a game is over when all fields in a diagonal are taken by a player
        // a player can take a field if not already taken
        // players take turns taking fields until the game is over
    }
}
