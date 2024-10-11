# react-use-hook-modal

`react-use-hook-modal` is a headless React Hook library designed to declaratively manage modals without including any UI components. This allows developers to fully control how their modals look and behave by integrating with any UI framework or custom modal system.

## Features

- 🎯 Declaratively manage modals in your React application.
- 🛠️ Headless implementation with no UI dependencies.
- ⚙️ Easily integrate with any UI framework or custom modal system.
- 🎨 Fully customizable modal behavior (animations, transitions, etc.).

## Examples

You can explore the [Storybook examples](https://react-use-hook-modal.vercel.app/?path=%2Fstory%2Fexamples-animation--framer-motion) to see how `react-use-hook-modal` works and can be integrated into various UI frameworks.

For example code, visit the [examples](https://github.com/iskkiri/react-use-hook-modal/tree/main/examples) in the repository for detailed implementation.

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

To open a modal, you can use the `useModal` hook as shown below.

```tsx
import { useModal } from 'react-use-hook-modal';
import MyModalComponent from './MyModalComponent';

const MyComponent = () => {
  const { open, close } = useModal(MyModalComponent);

  const onOpenModal = useCallback(() => {
    open({
      onClose: close,
      onConfirm: () => {
        console.log('Confirmed');
        close();
      },
    });
  }, []);

  return <button onClick={onOpenModal}>Open Modal</button>;
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

| Prop        | Type                                           | Default            | Description                                                                                                                                                                                                      |
| ----------- | ---------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                              | **Required**       | The child elements rendered inside the `ModalProvider`. Typically, this is your application that interacts with the modals.                                                                                      |
| `container` | `React.ComponentType<React.PropsWithChildren>` | `React.Fragment`   | Optional custom container component for rendering modals. Use this to define a custom container, allowing you to integrate modal animations with libraries like React Transition Group.                          |
| `clearTime` | `number`                                       | `3000` (3 seconds) | The time in milliseconds before a modal is fully removed from the internal state (`modals`) after closing. This ensures that any exit animations are fully displayed before the modal is removed from the state. |

### useModal

`useModal` is a custom hook designed to manage the opening and closing of modals in a React application. It takes a modal component as input and returns two functions: `open` and `close`, which can be used to control the modal's visibility.

| Parameter   | Type                          | Description                                                                                                   |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Component` | `React.ComponentType<TProps>` | The modal component to be rendered. This component should have an `isOpen` prop that controls its visibility. |

#### Returns:

The `useModal` hook returns the following functions:

| Return Value | Type                                                                                                                                                                                                    | Description                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`       | `(props: Omit<TProps, 'isOpen'>, options?: OpenModalOptions) => void` (if required props exist) <br> `(props?: Omit<TProps, 'isOpen'>, options?: OpenModalOptions) => void` (if all props are optional) | Opens the modal. If the modal component has required props, those props must be provided. If all props are optional, `open` can be called without any props. Additionally, you can pass options such as `key` and `portalTarget`. |
| `close`      | `(key?: string \| number) => void`                                                                                                                                                                      | Closes the modal. Optionally, a modal key can be passed to close a specific modal instance.                                                                                                                                       |

#### OpenModalOptions

The `OpenModalOptions` is an optional parameter for the `open` function returned by `useModal`. It allows users to customize the behavior of the modal when opening.

| Option         | Type               | Description                                                                                                                              |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `key`          | `string \| number` | (Optional) A unique key for identifying the modal instance. Useful when managing multiple modals simultaneously.                         |
| `portalTarget` | `HTMLElement`      | (Optional) The DOM element where the modal will be rendered. Useful when you want to render the modal in a specific container or portal. |

### useModalsState

`useModalsState` is a custom hook designed to access the current state of all modals in your application.

#### Returns:

The `useModalsState` hook returns the current state of modals.

| Return Value | Type                 | Description                                                                                                 |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `modals`     | `Array<ModalObject>` | Each modal object contains information about the modal, such as the component, its props, and a unique key. |

## Contributing

Contributions are welcome! Please check the [CONTRIBUTING.md](https://github.com/iskkiri/react-use-hook-modal#contributing) for details on how to get involved and contribute to this project.

## Compatibility

This library is compatible with React 16.8 and later.

## License

This library is released under the MIT License.
