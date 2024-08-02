// src/screens/Screen2.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const Guia = () => {
  return (
    <View style={styles.container}>
      <Header title="¿Cómo comprar?" />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          ¡Bienvenido a nuestra tienda!
        </Text>
        <Text style={styles.text}>
          Para generar una orden, selecciona los productos que deseas comprar y añádelos a tu carrito. Luego, confirma tu compra desde el carrito.
        </Text>
        <Text style={styles.text}>
          ¡Gracias por comprar con nosotros!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#C8C8C8',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Guia;
