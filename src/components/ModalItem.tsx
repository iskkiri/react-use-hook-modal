import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalItemProps {
  component: React.ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  portalTarget?: HTMLElement | null;
}

export default function ModalItem({ component: Component, props, portalTarget }: ModalItemProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(portalTarget ? portalTarget : document.body);
  }, [portalTarget]);

  if (!portalElement) return null;

  return createPortal(<Component {...props} />, portalElement);
}
