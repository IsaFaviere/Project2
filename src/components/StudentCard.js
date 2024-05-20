import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import StudentModal from './StudentModal';

const StudentCard = ({ student }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={toggleModal}>
        <Image source={{ uri: student.picture.thumbnail }} style={styles.thumbnail} />
        <View style={styles.info}>
          <Text style={styles.name}>{`${student.name.title} ${student.name.first} ${student.name.last}`}</Text>
          <Text>{student.gender}</Text>
          <Text>{new Date(student.dob.date).toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
      <StudentModal
        visible={modalVisible}
        student={student}
        onClose={toggleModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentCard;
