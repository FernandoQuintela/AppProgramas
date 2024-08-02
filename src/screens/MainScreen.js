// src/screens/MainScreen.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Tienda" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Productos')}>
          <Text style={styles.buttonText}>Colecciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Guia')}>
          <Text style={styles.buttonText}>¿Cómo comprar?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#313131',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#C8C8C8',
    fontSize: 20,
    textAlign: 'center',
    textShadowColor: '#000', // Color de la sombra
    textShadowOffset: { width: 2, height: 2 }, // Desplazamiento de la sombra
    textShadowRadius: 1, // Radio de la sombra
  },
});

export default MainScreen;
