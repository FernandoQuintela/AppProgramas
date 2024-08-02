// src/screens/Carrito.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { addOrder } from '../store/orderSlice';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

const Carrito = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleConfirmPurchase = () => {
    const newOrder = {
      id: uuid.v4(),
      items: cartItems,
      date: new Date().toLocaleString(),
    };
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigation.navigate('Orden');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.nombre}</Text>
        <Text style={styles.typeText}>{item.tipo}</Text>
        <Text style={styles.sizeText}>{item.tamaño} ejemplares</Text>
        <Text style={styles.priceText}>${item.precio * item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Image source={require('../../assets/trash.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Carrito" />
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPurchase}>
          <Text style={styles.confirmButtonText}>Confirmar compra</Text>
        </TouchableOpacity>
      )}
      {cartItems.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>El carrito está vacío.</Text>
        </View>
      )}
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
  typeText: {
    color: '#121212',
    fontSize: 16,
    marginBottom: 4,
  },
  sizeText: {
    color: '#121212',
    fontSize: 16,
    marginBottom: 4,
  },
  priceText: {
    color: '#121212',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  confirmButton: {
    backgroundColor: '#337ab7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  confirmButtonText: {
    color: '#C8C8C8',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#C8C8C8',
    fontSize: 18,
  },
});

export default Carrito;
