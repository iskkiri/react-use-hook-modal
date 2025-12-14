# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with code in this repository.

## Project Overview

`react-use-hook-modal` is a headless React Hook library for declaratively managing modals without UI components. It supports both React (web) and React Native environments.

## Tech Stack

- **Language**: TypeScript
- **Framework**: React 16.8+
- **Build**: Rollup
- **Testing**: Vitest + React Testing Library
- **Package Manager**: pnpm
- **Release**: semantic-release with Conventional Commits

## Project Structure

```
src/
├── components/
│   ├── ModalItem.tsx      # Renders individual modal with portal support
│   └── Modals.tsx         # Container component for all modals
├── contexts/
│   ├── ModalContext.ts    # React contexts for modal state and dispatch
│   └── ModalProvider.tsx  # Provider component with modal management logic
├── hooks/
│   ├── useClearModals.ts  # Hook to close all modals
│   ├── useModal.ts        # Main hook for modal control (open, close, update)
│   ├── useModalStatus.ts  # Hook to monitor specific modal's open state
│   └── useModalsState.ts  # Hook to access all modals state
├── types/
│   └── modal.ts           # TypeScript type definitions
├── utils/
│   └── nanoid.ts          # Unique ID generator for modal keys
└── index.ts               # Public exports

examples/
├── web/                   # Web examples with various UI libraries
└── react-native/          # React Native example
```

## Common Commands

```bash
# Install dependencies
pnpm install

# Development (watch mode)
pnpm dev

# Build
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm coverage

# Type checking
pnpm check-types

# Linting
pnpm lint

# Formatting
pnpm format
```

## Key Concepts

### InjectedProps

Modal components receive `isOpen` and `close` props automatically injected by the library:

```typescript
interface MyModalProps extends InjectedProps<ResultType> {
  title: string;
}
```

### Promise-based API

The `open()` function returns a Promise that resolves when the modal closes:

```typescript
const result = await open({ title: 'Confirm?' });
```

### Modal Keys

Each modal instance has a unique key. Custom keys can be provided for managing multiple modals:

```typescript
open({ title: 'Modal 1' }, { key: 'modal-1' });
```

## Commit Message Convention

Follow Conventional Commits for semantic-release:

- `feat:` - New features (minor version)
- `feat!:` - Breaking changes (major version)
- `fix:` - Bug fixes (patch version)
- `docs:` - Documentation (patch version)
- `refactor:` - Code restructuring (patch version)
- `test:` - Tests (no release)
- `chore:` - Maintenance (no release)

## Testing Guidelines

- Tests are located in `src/__tests__/`
- Use `InjectedProps` type for test modal components
- Run `pnpm coverage` to ensure 100% coverage is maintained
