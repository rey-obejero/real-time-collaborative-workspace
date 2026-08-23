using KnowledgeManagementApp.Api.Application.Interfaces;

namespace KnowledgeManagementApp.Api.UnitTests.Fakes;

public class UserContextFake : IUserContext
{
    public Guid UserId { get; set; }
}
