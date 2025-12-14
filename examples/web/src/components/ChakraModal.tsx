import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import type { InjectedProps } from 'react-use-hook-modal';

interface ChakraModalProps extends InjectedProps<{ confirmed: boolean }> {
  title: string;
  content: string;
}

export default function ChakraModal({ title, content, isOpen, close }: ChakraModalProps) {
  const onClose = useCallback(() => {
    close({ result: { confirmed: false } });
  }, [close]);

  const onConfirm = useCallback(() => {
    close({ result: { confirmed: true } });
  }, [close]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
