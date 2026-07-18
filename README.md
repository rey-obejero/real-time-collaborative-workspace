# Knowledge Management System

## Project Overview

Knowledge Management System is a personal knowledge management software (PKMS)
application intended to serve as a "second brain." The application provides are
structured way to classify and organize information, taking inspiration from well
known methodologies such as Project, Areas, Resources, and Archives (PARA) and the
Gettings Things Done (GTD).

## Prerequisites

This application is built with ASP&#46;NET Core, C#, React, TypeScript, and Docker.
To run or develop, the following tools are required:

- Docker and Docker Compose
- Node.js
- .NET 10.0 SDK
- Make

## Getting Started

Before proceeding, ensure the necessary tools are installed.

To run the project, use the Makefile at the root of the directory:

1. To view the valid Make targets, use

   ```console
   make
   ```

2. Start the web client with

   ```console
   make web
   ```

3. Start the API server and the local database with

   ```console
   make api
   ```

## Project Structure

See the [API documentation](/apps/api/README.md) for more detailed information on
the API.

See the [web client documentation](/apps/web/README.md) for more detailed
information on the web client.

```text

.
├── modules                       # The building blocks
│   ├── api                       # The core back-end
│   └── web                       # The web browser client
├── documentation
│   ├── architecture
│   ├── features
│   └── architecture-diagrams.md
├── docker-compose.yml
├── Makefile                      # Build scripts
├── README.md

```

## Roadmap

### Features

- [ ] Authentication
  - [ ] OIDC compliance
  - [ ] OAuth schemes
- [ ] Workspaces
  - [ ] Workspace memberships
  - [ ] Real-time entry collaboration (least priority)
  - [ ] Dynamic and granular roles/permissions
  - [ ] Worksace API key generatino for programmatic access
- [ ] Entries
  - Entries sharing for non-workspace members
  - Browser extension for quick GTD-style inboxing
- [ ] Human-readable URLs for improved bookmark and address bar autocomplete legibility
- [ ] Conversations
- [ ] AI
  - [ ] Conversations assistant
