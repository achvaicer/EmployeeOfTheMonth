using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using EmployeeOfTheMonth.Model;

namespace EmployeeOfTheMonth
{
    class Program
    {
        static void Main(string[] args)
        {
            var firstday = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);

            Console.WriteLine("Data | Dia Semana | Entrada | Inicio Almoço | Retorno Almoço | Saída");

            for (var date = firstday; date.Month == firstday.Month; date = date.AddDays(1))
            {
                var workhour = new WorkHour(date);
                Console.WriteLine(workhour);
            }

            Console.WriteLine("Press key to exit");
            Console.ReadKey();
        }
    }
}
