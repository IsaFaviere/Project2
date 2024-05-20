import React from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const StudentModal = ({ visible, student, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: student.picture.large }} style={styles.image} />
          <Text style={styles.name}>{`${student.name.first} ${student.name.last}`}</Text>
          <Text>{`Email: ${student.email}`}</Text>
          <Text>{`Gênero: ${student.gender}`}</Text>
          <Text>{`Data de Nascimento: ${new Date(student.dob.date).toLocaleDateString()}`}</Text>
          <Text>{`Telefone: ${student.phone}`}</Text>
          <Text>{`Nacionalidade: ${student.nat}`}</Text>
          <Text>{`Endereço: ${student.location.street.name}, ${student.location.city}, ${student.location.state}, ${student.location.country}`}</Text>
          <Text>{`ID: ${student.id.value}`}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StudentModal;
