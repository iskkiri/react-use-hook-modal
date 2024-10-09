# React use hook modal

React use hook modal is a headless React Hook library designed to manage modals without including any UI components. This gives developers full control over how their modals look and behave by integrating with any UI framework or custom modal system.

## Installation

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

To start using react useModal, wrap your application with the ModalProvider.

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

## Compatibility

React useModal is compatible with React 16.8 and later.

## License

React useModal is released under the MIT License.
