using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContext;
        public UserAccessor(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }

        public string GetUsername()
        {
            return _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.Name);            
        }
    }
}