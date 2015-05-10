using NUnit.Framework;

namespace Tests
{
    public class GameShouldBe
    {
        [Test]
        public void NotOverWhenGameStarts()
        {
            var fields = new[] { ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' };
            Assert.That(false, Is.EqualTo(Game.IsOver(fields)));
        }

        [Test]
        public void NotOverWhenAllFieldsNotTaken()
        {
            var fields = new[] {'X', 'O', 'O', 
                                'X', ' ', 'O', 
                                'O', 'X', 'X'};
            Assert.That(false, Is.EqualTo(Game.IsOver(fields)));
        }

        [Test]
        public void OverWhenAllFieldsAreTaken()
        {
            var fields = new[] {'X', 'O', 'O', 'X', 'O', 'O', 'X', 'O', 'O'};
            Assert.That(true, Is.EqualTo(Game.IsOver(fields)));
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
        public void OverWhenAllFieldsInARowAreTakenByAPlayer(char[] fields)
        {
            Assert.That(true, Is.EqualTo(Game.IsOver(fields)));
        }

        [TestCase(new[] {'X', 'O', 'O', 
                        'X', ' ', 'O', 
                        'O', 'O', 'X'})]

        public void NotOverWhenFollowingThreeFieldsAreTakenByAPlayerButNotInTheSameRow(char[] fields)
        {
            Assert.That(false, Is.EqualTo(Game.IsOver(fields)));
        }

        [TestCase(new[] { 'X', ' ', ' ', 
                          'X', ' ', ' ', 
                          'X', ' ', ' ' })]
        [TestCase(new[] { ' ', ' ', 'X', 
                          ' ', ' ', 'X', 
                          ' ', ' ', 'X' })]
        public void OverWhenAllFieldsInAColumnAreTakenByAPlayer(char[] fields)
        {
            Assert.That(true, Is.EqualTo(Game.IsOver(fields)));
        }

        // a game is over when all fields in a column are taken by a player
        // a game is over when all fields in a diagonal are taken by a player
        // a player can take a field if not already taken
        // players take turns taking fields until the game is over
    }
}
