import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import { ModalProvider, useModal } from 'react-use-hook-modal';

function TestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Hello from React Native Modal!</Text>
          <Button title="Close Modal" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

function ModalTest() {
  const { open: openTestModal, close: closeTestModal } = useModal(TestModal);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Modal Test</Text>
      <Button title="Open Modal" onPress={() => openTestModal({ onClose: closeTestModal })} />

      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <ModalTest />
    </ModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
