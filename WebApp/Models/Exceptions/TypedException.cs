using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Exceptions
{
    public class TypedException : Exception
    {
        public TypedException(ExceptionType type)
        {
            Type = type;
        }

        public ExceptionType Type { get; set; }
    }
}
