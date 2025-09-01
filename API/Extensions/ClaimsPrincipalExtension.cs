using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtension
{
    public static string? GetUserName(this ClaimsPrincipal user)
    {
        return user.Identity?.Name ?? throw new UnauthorizedAccessException();
    }
}
