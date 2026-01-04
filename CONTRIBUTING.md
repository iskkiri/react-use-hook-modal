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

## Changesets

We use [Changesets](https://github.com/changesets/changesets) to manage releases. When you make changes that should be released, you need to create a changeset file.

### Creating a Changeset

After making your changes, run:

```shell
pnpm changeset
```

This will prompt you to:

1. Select the type of version bump (major, minor, or patch)
2. Write a summary of the changes

The changeset file will be created in the `.changeset` directory and should be committed with your PR.

### Version Bump Guidelines

- **major**: Breaking changes that require users to update their code
- **minor**: New features that are backwards-compatible
- **patch**: Bug fixes and documentation changes

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
