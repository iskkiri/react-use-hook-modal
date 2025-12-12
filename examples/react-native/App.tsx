import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalProvider, useModal, type InjectedProps } from 'react-use-hook-modal';

function TestModal({ isOpen, close }: InjectedProps<{ confirmed: boolean }>) {
  return (
    <Modal
      visible={isOpen}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={() => close({ result: { confirmed: false } })}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Action</Text>
          <Text style={styles.modalText}>Do you want to proceed?</Text>
          <View style={styles.buttonRow}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => close({ result: { confirmed: false } })}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.confirmButton}
              onPress={() => close({ result: { confirmed: true } })}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ModalTest() {
  const [result, setResult] = useState('No result yet');
  const { open: openTestModal } = useModal(TestModal);

  const handleOpenModal = useCallback(async () => {
    setResult('Waiting for user...');

    const { confirmed } = await openTestModal();

    if (confirmed) {
      setResult('User confirmed!');
    } else {
      setResult('User cancelled!');
    }
  }, [openTestModal]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Text style={styles.title}>React Native Modal Test</Text>
      <Button title="Open Modal" onPress={handleOpenModal} />

      <Text style={styles.resultText}>
        Result: <Text style={styles.resultValue}>{result}</Text>
      </Text>

      <StatusBar style="auto" />
    </SafeAreaView>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
  },
  resultValue: {
    fontWeight: 'bold',
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
