using NUnit.Framework;

namespace Tests
{
    public class GameShouldBe
    {
        [Test]
        public void NotOverWhenGameStarts()
        {
            var fields = new[,] { {' ', ' ', ' '},
                                  {' ', ' ', ' '}, 
                                  {' ', ' ', ' '}};
            Assert.That(Game.IsOver(fields), Is.False);
        }

        [Test]
        public void NotOverWhenAllFieldsNotTaken()
        {
            var fields = new[,] {{'X', 'O', 'O'}, 
                                 {'X', ' ', 'O'}, 
                                 {'O', 'X', 'X'}};
            Assert.That(Game.IsOver(fields), Is.False);
        }

        [Test]
        public void OverWhenAllFieldsAreTaken()
        {
            var fields = new[,] {{'X', 'O', 'O'},
                                 {'X', 'O', 'O'}, 
                                 {'X', 'O', 'O'}};
            Assert.That(Game.IsOver(fields), Is.True);
        }

        readonly object[] _allInARowCases ={ 
            new[,] { {'X', 'X', 'X'}, 
                     {' ', ' ', ' '}, 
                     {' ', ' ', ' '} },
            new[,] { { 'O', 'O', 'O'},
                     {' ', ' ', ' '}, 
                     {' ', ' ', ' '} },
            new[,] { { ' ', ' ', ' '}, 
                     {'X', 'X', 'X'}, 
                     {' ', ' ', ' ' }},
            new[,] { { ' ', ' ', ' ', },
                     {' ', ' ', ' '}, 
                     {'X', 'X', 'X' }}
        };
        [TestCaseSource("_allInARowCases")]
        
        public void OverWhenAllFieldsInARowAreTakenByAPlayer(char[,] fields)
        {
            Assert.That(Game.IsOver(fields), Is.True);
        }

        [Test]
        public void NotOverWhenFollowingThreeFieldsAreTakenByAPlayerButNotInTheSameRow()
        {
            var fields = new[,] {{'X', 'O', 'O'}, 
                                {'X', ' ', 'O'}, 
                                {'O', 'O', 'X'}};
            Assert.That(Game.IsOver(fields), Is.False);
        }

        readonly object[] _allInAColumnCases ={ 
            new[,] {{ 'X', ' ', ' '}, 
                    {'X', ' ', ' '}, 
                    {'X', ' ', ' ' }},
            new[,] {{ ' ', ' ', 'X'}, 
                    {' ', ' ', 'X'}, 
                    {' ', ' ', 'X' }}
        };
        [TestCaseSource("_allInAColumnCases")]
        public void OverWhenAllFieldsInAColumnAreTakenByAPlayer(char[,] fields)
        {
            Assert.That(Game.IsOver(fields), Is.True);
        }

        readonly object[] _allInDiagonalCases = {
            new[,] {{ 'X', ' ', ' '}, 
                    {' ', 'X', ' '}, 
                    {' ', ' ', 'X' }},
            new[,] {{ ' ', ' ', 'O'}, 
                    {' ', 'O', ' '}, 
                    {'O', ' ', ' ' }}
        };
        [TestCaseSource("_allInDiagonalCases")]
        public void OverWhenAllFieldsInADiagonalAreTakenByAPlayer(char[,] fields)
        {
            Assert.That(Game.IsOver(fields), Is.True);
        }

        // a player can take a field if not already taken
        // players take turns taking fields until the game is over
    }
}
