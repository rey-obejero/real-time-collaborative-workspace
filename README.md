# Real-Time Collaborative Workspace

## Project Overview

Workspace is a knowledge management platform that provides a flexible way to
structure and organize information. Instead of being locked into
generic pages, the user declares what kinds of items their workspace holds upfront.
The structure is opinionated, but the item types are user-defined.

## Prerequisites

This application is built with ASP&#46;NET Core, C#, React, TypeScript, and Docker.
To run or develop, the following tools are required:

- Docker and Docker Compose
- Node.js
- .NET 10.0 SDK
- Make
- Caddy

## Getting Started

Before proceeding, ensure the necessary tools are installed.

To run the project, use the Makefile at the root of the directory:

1. To view the valid Make targets, use

   ```console
   make
   ```

2. Run the setup target. This installs dependencies, allows Caddy to bind to ports
   80/443, and trusts Caddy's local CA.

   ```console
   make setup
   ```

3. Start the whole application (API server, web client, database, and the
   Caddy reverse proxy):

   ```console
   make application
   ```

   The web client is accessible at
   <https://workspace.localhost> and the API at
   <https://api.workspace.localhost>.

   Alternatively, start the services individually:

   ```console
   make api
   make web
   ```

### Browser Trust on Windows

If Caddy's local CA lives inside WSL, the Windows host's browsers (Firefox, Chrome,
Edge) do not trust it by default. Install it on the host:

```console
make caddy-trust-windows
```

This copies the CA from WSL into the Windows user root certificate store.
For Firefox, ensure the `security.enterprise_roots.enabled` flag is set to `true`:

1. Open `about:config` in Firefox.
2. Set `security.enterprise_roots.enabled` to `true`.
3. Restart Firefox.

Without this setup, the browser may present a security warning. Dismissing this warning allows you to proceed to the web client normally, but this results in unintended behavior, such as requests to the API server served at `api.workspace.localhost` failing.

## Project Structure

See the [API documentation](/modules/api/README.md) for more detailed information on
the API.

See the [web client documentation](/modules/web/README.md) for more detailed
information on the web client.

```text

.
├── modules                       # The building blocks
│   ├── api                       # The core back-end
│   └── web                       # The web browser client
├── infrastructure                # Container and reverse proxy configuration
│   ├── Caddyfile                 # Caddy reverse proxy configuration
│   ├── caddy-trust.sh
│   └── docker-compose.yml        # Docker Compose configuration
├── documentation                 # Project documentation
├── Makefile                      # Build scripts
├── README.md                     # You are here

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

## Resources

### AI

- **[skills.sh](https://www.skills.sh):** Agent skills
- **[maxbogo/awesome-ai-tools-for-ui](https://github.com/maxbogo/awesome-ai-tools-for-ui):** UI/UX tools for AI agents

### Back-End

- **[Common web application architectures](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures):** Common back-end architectures
- **[Clean architecture](https://devblogs.microsoft.com/ise/next-level-clean-architecture-boilerplate):** Clean architecture
- **[ardalis/CleanArchitecture](https://github.com/ardalis/CleanArchitecture):** Back-end architecture

### Front-End

- **[alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react):** Front-end architecture principles
- **[DiceBear](https://www.dicebear.com):** API-ready customizable avatars
- **[Formito](https://formito.com/tools):** Logo and favicon tools

### UI/UX

- **[Dribbble](https://dribbble.com):** Design inspiration
- **[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)**: Design system specifications in [DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/overview)
