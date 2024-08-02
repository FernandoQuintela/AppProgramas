// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Header = ({ title }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1D1D1D',
  },
  header: {
    width: '100%',
    height: 120, // Ajustar la altura para que cubra la parte superior
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#C8C8C8',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Header;
