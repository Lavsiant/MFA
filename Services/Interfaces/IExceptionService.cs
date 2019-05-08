using Services.Models.Common;

namespace Services.Interfaces
{
    public interface IExceptionService
    {
        string GetExceptionMessageText(ExceptionType exType);

        ErrorResponseModel GetResponseByExceptionType(TypedException ex);
    }
}
