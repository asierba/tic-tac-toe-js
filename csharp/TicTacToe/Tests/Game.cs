namespace Tests
{
    public class Game
    {
        private const char Empty = ' ';

        public static bool IsOver(char[,] fields)
        {
            return PlayerTookARow(fields) ||
                    PlayerTookAColumn(fields) ||
                    PlayerTookADiagonal(fields) ||
                    AllTaken(fields);
        }

        private static bool PlayerTookADiagonal(char[,] fields)
        {
            if (fields[1, 1] != Empty && fields[1, 1] == fields[0, 0] && fields[1, 1] == fields[2, 2])
                return true;
            if (fields[1, 1] != Empty && fields[1, 1] == fields[0, 2] && fields[1, 1] == fields[2, 0])
                return true;

            return false;
        }

        private static bool PlayerTookAColumn(char[,] fields)
        {
            for (var x = 0; x < fields.GetLength(0); x++)
            {
                if (fields[0, x] != Empty && fields[0, x] == fields[1, x] && fields[0, x] == fields[2, x])
                    return true;
            }
            return false;
        }

        private static bool PlayerTookARow(char[,] fields)
        {
            for (var y = 0; y < fields.GetLength(1); y++)
            {
                if (fields[y, 0] != Empty && fields[y, 0] == fields[y, 1] && fields[y, 0] == fields[y, 2])
                    return true;
            }
            return false;
        }

        private static bool AllTaken(char[,] fields)
        {
            foreach (var field in fields)
            {
                if (field == Empty)
                    return false;
            }
            return true;
        }
    }
}