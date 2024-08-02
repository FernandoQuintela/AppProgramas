// src/screens/Orden.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeOrder } from '../store/orderSlice';
import Header from '../components/Header';

const Orden = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const handleRemove = (orderId) => {
    dispatch(removeOrder(orderId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>Fecha: {item.date}</Text>
        <FlatList
          data={item.items}
          renderItem={({ item }) => (
            <Text style={styles.detailText}>{item.nombre} - {item.tipo} - {item.tamaño} ejemplares - ${item.precio * item.quantity}</Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Image source={require('../../assets/trash.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Órdenes" />
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    color: '#121212',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailText: {
    color: '#121212',
    fontSize: 16,
    marginBottom: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Orden;
