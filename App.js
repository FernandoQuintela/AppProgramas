// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import MainScreen from './src/screens/MainScreen';
import Screen1 from './src/screens/Screen1';
import Screen2 from './src/screens/Screen2'; // Asegúrate de que esta es la pantalla de guía
import Carrito from './src/screens/Carrito';
import Orden from './src/screens/Orden';
import ProductDetail from './src/screens/ProductDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TiendaStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainScreen" component={MainScreen} />
    <Stack.Screen name="Productos" component={Screen1} />
    <Stack.Screen name="Guia" component={Screen2} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} />
  </Stack.Navigator>
);

const App = () => {
  const renderIcon = (route, focused) => {
    let iconName;

    if (route.name === 'Tienda') {
      iconName = focused
        ? require('./assets/shop-b.png')
        : require('./assets/shop-a.png');
    } else if (route.name === 'Carrito') {
      iconName = focused
        ? require('./assets/cart-b.png')
        : require('./assets/cart-a.png');
    } else if (route.name === 'Orden') {
      iconName = focused
        ? require('./assets/purchase-b.png')
        : require('./assets/purchase-a.png');
    }

    return <Image source={iconName} style={styles.icon} />;
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => renderIcon(route, focused),
            tabBarShowLabel: false,
            tabBarStyle: {
              height: '15%',
              backgroundColor: '#1D1D1D',
            },
            tabBarItemStyle: {
              padding: 5,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Tienda"
            component={TiendaStack}
            listeners={({ navigation }) => ({
              tabPress: e => {
                e.preventDefault();
                navigation.navigate('MainScreen');
              },
            })}
          />
          <Tab.Screen name="Carrito" component={Carrito} />
          <Tab.Screen name="Orden" component={Orden} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
});

export default App;
