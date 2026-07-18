using KnowledgeManagementApp.Api.Application.Features.Authentication;
using KnowledgeManagementApp.Api.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace KnowledgeManagementApp.Api.Application.Mappers;

[Mapper]
public partial class UserMapper : IUserMapper
{
    public partial UserDto UserToUserDto(User user);
}
