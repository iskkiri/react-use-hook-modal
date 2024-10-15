# Contribution Guidelines

Welcome to react-use-hook-modal! I'm thrilled that you're interested in contributing. Here are some guidelines to help you get started.

## Semantic Versioning

react-use-hook-modal follows Semantic Versioning 2.0 as defined at http://semver.org. This means that releases will be numbered with the following format:

\<major>.\<minor>.\<patch>

- Breaking changes and new features will increment the major version.
- Backwards-compatible enhancements will increment the minor version.
- Bug fixes and documentation changes will increment the patch version.

## Pull Request Process

Fork the repository and create a branch for your feature/bug fix.

- Add tests for your feature/bug fix.
- Ensure that all tests pass before submitting your pull request.
- Update the README.md file if necessary.
- Ensure that your commits follow the conventions outlined in the next section.

## Commit Message Conventions

- We use semantic-release to manage releases automatically. To ensure that releases are automatically versioned correctly, we follow the Conventional Commits Conventions. This means that your commit messages should have the following format:
  \<type>: \<subject>

Here's what each part of the commit message means:

- \<type>: The type of change that you’re committing. Valid types include:
  - feat: For new features
  - refactor: For restructuring existing code without changing its external behavior (e.g. code cleanup or optimization)
  - fix: For bug fixes
  - docs: For documentation changes
  - chore: For changes that don’t affect the code itself (e.g. updating dependencies)
  - test: For adding or updating tests
- \<subject>: A short description of the change.

## Code Style and Linting

This project uses Prettier and ESLint for code formatting. Please make sure your code passes the linting and formatting checks before submitting a PR.

To check the code:

```shell
pnpm lint
pnpm format
```

## Testing

react-use-hook-modal uses Vitest for testing. Please ensure that your changes are covered by tests, and that all tests pass before submitting your pull request.

You can run the tests with the test task:

```shell
pnpm test
```

## Areas to contribute

- Bug fixes
- New features
- Documentation improvements
- Examples or tutorials
