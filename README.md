# react-use-hook-modal

![npm](https://img.shields.io/npm/v/react-use-hook-modal) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-use-hook-modal) ![Test](https://github.com/iskkiri/react-use-hook-modal/actions/workflows/test.yaml/badge.svg) ![NPM License](https://img.shields.io/npm/l/react-use-hook-modal)

`react-use-hook-modal` is a headless React Hook library designed to declaratively manage modals without including any UI components. This allows developers to fully control how their modals look and behave by integrating with any UI framework or custom modal system.

## Features

- 🎯 Declaratively manage modals in your React application.
- 🛠️ Headless implementation with no UI dependencies.
- ⚙️ Easily integrate with any UI framework or custom modal system.
- 🎨 Fully customizable modal behavior (animations, transitions, etc.).

## Examples

You can explore the full list of examples, including live CodeSandbox links, in the [example list](https://github.com/iskkiri/react-use-hook-modal/blob/main/examples/README.md). These examples demonstrate how to integrate react-use-hook-modal with popular UI libraries like Material UI, Bootstrap, Chakra UI, and even custom modal setups. Try different use cases directly in your browser.

## Installation

Install the package with your package manager of choice:

npm

```shell
npm install react-use-hook-modal
```

yarn

```shell
yarn add react-use-hook-modal
```

pnpm

```shell
pnpm add react-use-hook-modal
```

## Getting set up

To start using react-use-hook-modal, wrap your application with the ModalProvider.

```tsx
import { ModalProvider } from 'react-use-hook-modal';

export default App = ({ children }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
```

## Basic Usage

To open a modal, you can use the `useModal` hook as shown below. The `isOpen` and `close` props are automatically injected into your modal component.

```tsx
import { useModal } from 'react-use-hook-modal';
import type { InjectedProps } from 'react-use-hook-modal';

// Modal component receives isOpen and close automatically
interface MyModalProps extends InjectedProps {
  title: string;
}

const MyModalComponent = ({ isOpen, close, title }: MyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <h1>{title}</h1>
      <button onClick={() => close()}>Close</button>
    </div>
  );
};

const MyComponent = () => {
  const { open } = useModal(MyModalComponent);

  const onOpenModal = useCallback(() => {
    open({ title: 'Hello World' });
  }, [open]);

  return <button onClick={onOpenModal}>Open Modal</button>;
};
```

### Promise-based Modal

The `open` function returns a Promise, allowing you to await the result when the modal closes.

```tsx
import { useModal } from 'react-use-hook-modal';
import type { InjectedProps } from 'react-use-hook-modal';

interface ConfirmModalProps extends InjectedProps<boolean> {
  message: string;
}

const ConfirmModal = ({ isOpen, close, message }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <p>{message}</p>
      <button onClick={() => close({ result: true })}>Confirm</button>
      <button onClick={() => close({ result: false })}>Cancel</button>
    </div>
  );
};

const MyComponent = () => {
  const { open } = useModal(ConfirmModal);

  const handleDelete = async () => {
    const confirmed = await open({ message: 'Are you sure?' });
    if (confirmed) {
      // User clicked Confirm
      await deleteItem();
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};
```

You can integrate `react-use-hook-modal` with libraries like `react-transition-group` to add animations to your modals:

```tsx
import { ModalProvider } from 'react-use-hook-modal';
import { TransitionGroup } from 'react-transition-group';

const App = ({ children }) => {
  return <ModalProvider container={TransitionGroup}>{children}</ModalProvider>;
};
```

## API Reference

### ModalProvider

| Prop           | Type                          | Default            | Description                                                                                                                                                                                                          |
| -------------- | ----------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`             | **Required**       | The child elements rendered inside the `ModalProvider`. Typically, this is your application that interacts with the modals.                                                                                          |
| `container`    | `React.ComponentType`         | `React.Fragment`   | Optional custom container component for rendering modals. Use this to define a custom container, allowing you to integrate modal animations with libraries like React Transition Group.                              |
| `clearTime`    | `number`                      | `3000` (3 seconds) | The time in milliseconds before a modal is fully removed from the internal state (`modals`) after closing. This ensures that any exit animations are fully displayed before the modal is removed from the state.     |
| `onAfterOpen`  | `(modal: ModalState) => void` | `undefined`        | A callback function triggered immediately after any modal is opened. It provides the state of the modal that was just opened. This can be useful for setting focus or starting animations based on the opened modal. |
| `onAfterClose` | `(modal: ModalState) => void` | `undefined`        | A callback function triggered immediately after any modal is closed. It provides the state of the modal that was just closed, allowing for cleanup tasks or triggering actions based on the closed modal's state.    |

### useModal

`useModal` is a custom hook designed to manage the opening, closing, and updating of modals in a React application. It takes a modal component as input and returns `open`, `close`, `update`, and `key` which can be used to control the modal's visibility and props.

The hook automatically injects `isOpen` and `close` props into your modal component, so you don't need to pass them manually.

| Parameter   | Type                          | Description                                                                                                                              |
| ----------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Component` | `React.ComponentType<TProps>` | The modal component to be rendered. This component will receive `isOpen` and `close` props automatically injected by the hook.           |

#### Returns:

The `useModal` hook returns the following:

| Return Value | Type                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `open`       | `(props: Omit<TProps, 'isOpen' \| 'close'>, options?: OpenModalOptions) => Promise<TResult>` (if required props exist) <br> `(props?: Omit<TProps, 'isOpen' \| 'close'>, options?: OpenModalOptions) => Promise<TResult>` (if all props are optional) | Opens the modal and returns a Promise that resolves when the modal is closed. The resolved value is the `result` passed to the `close` function. If the modal component has required props (other than `isOpen` and `close`), those props must be provided.                                                                                            |
| `close`      | `(options?: CloseModalOptions<TResult>) => void`                                                                                                                                                                          | Closes the modal. Optionally accepts `CloseModalOptions` which includes `key` to close a specific modal instance, `clearTime` to override the global clearTime, and `result` to resolve the Promise returned by `open`.                                                                                                                                |
| `update`     | `(props: Partial<Omit<TProps, 'isOpen' \| 'close'>>, options?: UpdateModalOptions) => void`                                                                                                                               | Updates the props of an open modal. Only updates the specified props while keeping others unchanged. Optionally accepts `UpdateModalOptions` which includes `key` to update a specific modal instance.                                                                                                                                                  |
| `key`        | `string \| number`                                                                                                                                                                                                        | A unique identifier for the modal. It is rarely needed, as most interactions rely on `open` and `close`. However, it can be useful in specific cases where you need to track or manage a particular modal's state manually. <br> **Note**: If you provide a custom key when opening a modal, it will be different from the key returned by `useModal`. |

#### OpenModalOptions

The `OpenModalOptions` is an optional parameter for the `open` function returned by `useModal`. It allows users to customize the behavior of the modal when opening.

| Option         | Type               | Description                                                                                                                              |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `key`          | `string \| number` | (Optional) A unique key for identifying the modal instance. Useful when managing multiple modals simultaneously.                         |
| `portalTarget` | `HTMLElement`      | (Optional) The DOM element where the modal will be rendered. Useful when you want to render the modal in a specific container or portal. |

### CloseModalOptions

The `CloseModalOptions` is an optional parameter for the `close` function returned by `useModal`. It allows users to customize the behavior of the modal when closing and optionally return a result.

| Option      | Type               | Description                                                                                                                                             |
| ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`       | `string \| number` | (Optional) A unique key for identifying the modal instance to close. If not provided, closes the modal associated with the current hook.                |
| `clearTime` | `number`           | (Optional) Override the global clearTime setting for this specific modal closure. Determines how long to wait before removing the modal from the state. |
| `result`    | `TResult`          | (Optional or Required based on typing) The value to resolve the Promise returned by `open`. If your modal component defines `close: CloseModal<SomeType>`, then `result` becomes required when calling `close`. |

### UpdateModalOptions

The `UpdateModalOptions` is an optional parameter for the `update` function returned by `useModal`. It allows users to specify which modal instance to update.

| Option | Type               | Description                                                                                                                              |
| ------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `key`  | `string \| number` | (Optional) A unique key for identifying the modal instance to update. If not provided, updates the modal associated with the current hook. |

### useModalStatus

`useModalStatus` is a hook designed for monitoring the open/close status of a specific modal. This hook only tracks the modal state without providing any control methods.

#### Parameters:

| Parameter | Type               | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| `key`     | `string \| number` | The unique identifier of the modal to monitor |

#### Returns:

| Return Value | Type      | Description                                          |
| ------------ | --------- | ---------------------------------------------------- |
| `isOpen`     | `boolean` | The current open/close status of the specified modal |

#### Example:

```tsx
import { useModalStatus } from 'react-use-hook-modal';

const MyComponent = () => {
  const { isOpen } = useModalStatus({ key: 'my-modal' });

  return <div>Modal is currently {isOpen ? 'open' : 'closed'}</div>;
};
```

**Note**: This hook must be used within a `ModalProvider`. It will throw an error if used outside of a `ModalProvider` context.

### useModalsState

`useModalsState` is a custom hook designed to access the current state of all modals in your application.

#### Returns:

The `useModalsState` hook returns the current state of modals.

| Return Value | Type                 | Description                                                                                                 |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `modals`     | `Array<ModalObject>` | Each modal object contains information about the modal, such as the component, its props, and a unique key. |

### useClearModals

The `useClearModals` is a custom hook that provides a function to close all open modals in the application.

#### Returns:

The `useClearModals` hook returns an object containing the `clearModals` function.

| Return Value  | Type         | Description                                                                                                                                                                                                |
| ------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clearModals` | `() => void` | Closes all currently open modals by setting their `isOpen` property to `false`. Any modal that remains unopened before `clearTime` elapses will be removed from the state after the specified `clearTime`. |

**Note**: If a modal is reopened before `clearTime` elapses, it will remain in the state, and only modals that are fully closed during the `clearTime` period will be removed.

## Contributing

Contributions are welcome! Please check the [CONTRIBUTING.md](https://github.com/iskkiri/react-use-hook-modal/blob/main/CONTRIBUTING.md) for details on how to get involved and contribute to this project.

## Compatibility

This library is compatible with React 16.8 and later.

## License

This library is released under the MIT License.
