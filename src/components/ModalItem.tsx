import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  portalTarget?: HTMLElement | null;
}

const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

export default function ModalItem({ component: Component, props, portalTarget }: ModalItemProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isReactNative) return;

    setPortalElement(portalTarget ? portalTarget : document.body);
  }, [portalTarget]);

  if (isReactNative) {
    return <Component {...props} />;
  }

  if (!portalElement) return null;

  return createPortal(<Component {...props} />, portalElement);
}
