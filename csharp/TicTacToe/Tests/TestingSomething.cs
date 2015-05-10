using System.Collections.Generic;
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
            var fields = new[] {'X', 'O', 'O', 
                                'X', ' ', 'O', 
                                'O', 'X', 'X'};
            Assert.That(false, Is.EqualTo(GameIsOver(fields)));
        }

        [Test]
        public void GameIsOverWhenAllFieldsTaken()
        {
            var fields = new[] {'X', 'O', 'O', 'X', 'O', 'O', 'X', 'O', 'O'};
            Assert.That(true, Is.EqualTo(GameIsOver(fields)));
        }

        [TestCase(new[] { 'X', 'X', 'X', 
                          ' ', ' ', ' ', 
                          ' ', ' ', ' ' })]
        [TestCase(new[] { 'O', 'O', 'O', 
                          ' ', ' ', ' ', 
                          ' ', ' ', ' ' })]
        [TestCase(new[] { ' ', ' ', ' ', 
                          'X', 'X', 'X', 
                          ' ', ' ', ' ' })]
        [TestCase(new[] { ' ', ' ', ' ', 
                          ' ', ' ', ' ', 
                          'X', 'X', 'X' })]
        //[TestCase(new[] {'X', 'O', 'O', 
        //                'X', ' ', 'O', 
        //                'O', 'O', 'X'})] //TODO special case - needs revisit

        public void GameIsOverWhenAllFieldsInARowAreTakenByAPlayer(char[] fields)
        {
            Assert.That(true, Is.EqualTo(GameIsOver(fields)));
        }

        [TestCase(new[] { 'X', ' ', ' ', 
                          'X', ' ', ' ', 
                          'X', ' ', ' ' })]
        [TestCase(new[] { ' ', ' ', 'X', 
                          ' ', ' ', 'X', 
                          ' ', ' ', 'X' })]
        public void GameIsOverWhenAllFieldsInAColumnAreTakenByAPlayer(char[] fields)
        {
            Assert.That(true, Is.EqualTo(GameIsOver(fields)));
        }

        private static bool GameIsOver(IReadOnlyList<char> fields)
        {
            return PlayerTookARow(fields) || 
                PlayerTookAColumn(fields) || 
                AllTaken(fields);
        }

        private static bool PlayerTookARow(IReadOnlyList<char> fields)
        {
            for (var i = 0; i < fields.Count() - 2; i++)
            {
                if (fields[i] != ' ' && fields[i] == fields[i + 1] && fields[i] == fields[i + 2])
                    return true;
            }
            return false;
        }

        private static bool PlayerTookAColumn(IReadOnlyList<char> fields)
        {
            for (var i = 0; i < 3; i++)
            {
                if (fields[i] != ' ' && fields[i] == fields[i + 3] && fields[i] == fields[i + 6])
                    return true;
            }
            return false;
        }

        private static bool AllTaken(IReadOnlyList<char> fields)
        {
            return !fields.Contains(' ');
        }

        // a game is over when all fields in a column are taken by a player
        // a game is over when all fields in a diagonal are taken by a player
        // a player can take a field if not already taken
        // players take turns taking fields until the game is over
    }
}
