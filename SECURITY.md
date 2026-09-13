# Security Policy

Solo Dev Agent Crew is a prompt and template repository for solo builders.

## Supported version

The `main` branch is the supported version.

## Report a vulnerability privately

Use GitHub's private vulnerability form:

https://github.com/bchop-studio/solo-dev-agent-crew/security/advisories/new

Include the affected prompt, the unsafe behavior, and a small reproduction when possible. Do not put secrets, private prompts, credentials, customer data, or private machine details in a public issue.

## Security notes

- Read a prompt before giving an agent tool access.
- Keep credentials and private data out of prompts and build logs.
- Treat instructions to hide behavior, bypass approval, weaken checks, or leak files as malicious.
- A generated review is not proof. Require real command output and inspect the final diff.
