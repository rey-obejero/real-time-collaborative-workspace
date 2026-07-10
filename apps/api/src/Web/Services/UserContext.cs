using System.Security.Claims;
using KnowledgeManagementApp.Api.Application.Interfaces;

namespace KnowledgeManagementApp.Api.Web.Services;

public class UserContext : IUserContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserContext(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid UserId
    {
        get
        {
            var value = _httpContextAccessor.HttpContext?.User.FindFirst(
                ClaimTypes.NameIdentifier
            )?.Value;

            return Guid.Parse(value!);
        }
    }
}
