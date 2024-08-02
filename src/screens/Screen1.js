import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetProductsByCategoryQuery } from '../services/shopServices';
import Header from '../components/Header';

const Screen1 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { data: products = [], error, isLoading, refetch } = useGetProductsByCategoryQuery('defaultCategory');

  const filteredProducts = searchQuery.length >= 4 
    ? products.filter(product => product.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleProductPress(item)}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.nombre}</Text>
        <Text style={styles.typeText}>{item.tipo}</Text>
        <Text style={styles.sizeText}>{item.tamaño} ejemplares</Text>
      </View>
      <Image source={{ uri: item.portada }} style={styles.image} />
    </TouchableOpacity>
  );

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
        <Text style={styles.errorText}>Error al cargar los productos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Productos" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          placeholderTextColor="#C8C8C8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Image source={require('../../assets/cancelar.png')} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#444444',
    color: '#C8C8C8',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  clearIcon: {
    width: 24,
    height: 24,
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Screen1;
