using NUnit.Framework;

namespace Tests
{
    public class GameShouldBe
    {
        [Test]
        public void NotOverWhenGameStarts()
        {
            var fields = new[] { ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' };
            Assert.That(Game.IsOver(fields), Is.False);
        }

        [Test]
        public void NotOverWhenAllFieldsNotTaken()
        {
            var fields = new[] {'X', 'O', 'O', 
                                'X', ' ', 'O', 
                                'O', 'X', 'X'};
            Assert.That(Game.IsOver(fields), Is.False);
        }

        [Test]
        public void OverWhenAllFieldsAreTaken()
        {
            var fields = new[] {'X', 'O', 'O', 'X', 'O', 'O', 'X', 'O', 'O'};
            Assert.That(Game.IsOver(fields), Is.True);
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
            Assert.That(Game.IsOver(fields), Is.True);
        }

        [TestCase(new[] {'X', 'O', 'O', 
                        'X', ' ', 'O', 
                        'O', 'O', 'X'})]

        public void NotOverWhenFollowingThreeFieldsAreTakenByAPlayerButNotInTheSameRow(char[] fields)
        {
            Assert.That(Game.IsOver(fields), Is.False);
        }

        [TestCase(new[] { 'X', ' ', ' ', 
                          'X', ' ', ' ', 
                          'X', ' ', ' ' })]
        [TestCase(new[] { ' ', ' ', 'X', 
                          ' ', ' ', 'X', 
                          ' ', ' ', 'X' })]
        public void OverWhenAllFieldsInAColumnAreTakenByAPlayer(char[] fields)
        {
            Assert.That(Game.IsOver(fields), Is.True);
        }

        [TestCase(new[] { 'X', ' ', ' ', 
                          ' ', 'X', ' ', 
                          ' ', ' ', 'X' })]
        [TestCase(new[] { ' ', ' ', 'O', 
                          ' ', 'O', ' ', 
                          'O', ' ', ' ' })]
        public void OverWhenAllFieldsInADiagonalAreTakenByAPlayer(char[] fields)
        {
            Assert.That(Game.IsOver(fields), Is.True);
        }

        // a player can take a field if not already taken
        // players take turns taking fields until the game is over
    }
}
