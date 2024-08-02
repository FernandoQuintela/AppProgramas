// src/screens/ProductDetail.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useGetProductByIdQuery } from '../services/shopServices';
import Header from '../components/Header';

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigation.navigate('Carrito');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar el producto</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Detalle del Producto" />
      <View style={styles.productContainer}>
        <Image source={{ uri: product.portada }} style={styles.image} resizeMode="contain" />
        <Text style={styles.nameText}>{product.nombre}</Text>
        <Text style={styles.typeText}>{product.tipo}</Text>
        <Text style={styles.sizeText}>{product.tamaño} ejemplares</Text>
        <Text style={styles.priceText}>${product.precio * quantity}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Cantidad</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={handleDecrease}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Añadir al Carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#C8C8C8',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#C8C8C8',
    fontSize: 18,
  },
  productContainer: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 6,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 6,
  },
  image: {
    width: '100%',
    height: 240,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
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
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
  },
  quantityContainer: {
    backgroundColor: '#1D1D1D',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  quantityLabel: {
    color: '#C8C8C8',
    fontSize: 18,
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlText: {
    color: '#C8C8C8',
    fontSize: 24,
    paddingHorizontal: 20,
  },
  quantityText: {
    color: '#C8C8C8',
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: '#7F7F7F',
  },
  addButton: {
    backgroundColor: '#337ab7',
  },
  backButtonText: {
    color: '#C8C8C8',
    fontSize: 16,
    textAlign: 'center',
  },
  addButtonText: {
    color: '#C8C8C8',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProductDetail;
