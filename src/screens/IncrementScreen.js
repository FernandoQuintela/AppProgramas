// src/screens/IncrementScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { increment } from '../store/slices/exampleSlice';

const IncrementScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(increment());
    navigation.goBack();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Incrementing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#C8C8C8',
    fontSize: 18,
  },
});

export default IncrementScreen;
