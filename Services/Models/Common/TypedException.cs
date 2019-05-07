using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Models.Common
{
    public class TypedException : Exception
    {
        public TypedException(ExceptionType type)
        {
            Type = type;
        }

        public TypedException(ExceptionType type, string message) : base(message)
        {
            Type = type;
        }

        public ExceptionType Type { get; set; }
    }
}
