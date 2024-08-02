// src/screens/DecrementScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { decrement } from '../store/slices/exampleSlice';

const DecrementScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(decrement());
    navigation.goBack();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Decrementing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#C8C8C8',
    fontSize: 18,
  },
});

export default DecrementScreen;
