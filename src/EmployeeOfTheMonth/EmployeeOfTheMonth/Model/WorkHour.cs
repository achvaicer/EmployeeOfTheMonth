using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace EmployeeOfTheMonth.Model
{
    class WorkHour
    {
        public DateTime Entrance { get; set; }
        public DateTime StartLunch { get; set; }
        public DateTime EndLunch { get; set; }
        public DateTime Exit { get; set; }

        public DateTime EntranceExtra { get; set; }
        public DateTime ExitExtra { get; set; }

        public TimeSpan TotalHours
        {
            get { return Exit.Subtract(Entrance) - EndLunch.Subtract(StartLunch); }
        }

        public TimeSpan TotalLunch
        {
            get { return EndLunch.Subtract(StartLunch); }
        }


        private DateTime _base;
        private readonly Random _random;
        private int GetMinutes()
        {
            return _random.Next(_base.Day, _base.Day + 30);
        }
        public WorkHour(DateTime date)
        {
            _base = date;
            _random = new Random(date.Day + Environment.MachineName.GetHashCode() + Environment.TickCount);
            Entrance = date.AddHours(Constants.MinimumEntrance).AddMinutes(GetMinutes());
            StartLunch = Entrance.AddHours(Constants.MinimumHoursBetweenEntranceAndLunchStart).AddMinutes(GetMinutes());
            EndLunch = StartLunch.AddHours(Constants.MinimumLunchHours).AddMinutes(GetMinutes());
            Exit = Entrance.AddHours(Constants.TotalWorkHours).Add(TotalLunch).AddMinutes(GetMinutes());
        }

        public override string ToString()
        {
            var cultureInfo = new CultureInfo("pt-BR");
            if (_base.DayOfWeek == DayOfWeek.Saturday || _base.DayOfWeek == DayOfWeek.Sunday)
                return string.Format("{0:D2}   | {1}        | *****   | *****         | *****          | *****", _base.Day, _base.ToString("ddd", cultureInfo));
            return string.Format("{0:D2}   | {1}        | {2:HH:mm}   | {3:HH:mm}         | {4:HH:mm}          | {5:HH:mm}", _base.Day,
                                 _base.ToString("ddd", cultureInfo), Entrance, StartLunch, EndLunch, Exit);
        }

    }
}
