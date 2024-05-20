import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import StudentCard from '../components/StudentCard';
import { StudentsContext } from '../contexts/StudentsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { students, setStudents } = useContext(StudentsContext);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const cachedData = await AsyncStorage.getItem('studentsPage1');
        if (cachedData && page === 1) {
          setStudents(JSON.parse(cachedData));
        } else {
          const response = await axios.get(`https://randomuser.me/api/?results=20&page=${page}`);
          const newStudents = response.data.results;
          setStudents(prevStudents => [...prevStudents, ...newStudents]);
          if (page === 1) {
            await AsyncStorage.setItem('studentsPage1', JSON.stringify(newStudents));
          }
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchStudents();
  }, [page]);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const filteredStudents = students.filter(student =>
    student.name.first.toLowerCase().includes(search.toLowerCase()) ||
    student.name.last.toLowerCase().includes(search.toLowerCase())
  );

  const loadMoreStudents = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        value={search}
        onChangeText={handleSearch}
      />
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.login.uuid}
          renderItem={({ item }) => <StudentCard student={item} />}
          onEndReached={loadMoreStudents}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default HomeScreen;
