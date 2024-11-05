import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import CartReviewScreen from '../screens/CartReviewScreen';
import ProductDetails from '../screens/ProductDetailScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import { selectTotalItems } from '../store/slices/cartSlices';
import { colors } from '../utils/styleUtils';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }}  />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }}  />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CartReview" component={CartReviewScreen} options={{ title: 'Review Your Cart' }} />
    <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ title: 'Order Confirmation' }} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }}  />
  </Stack.Navigator>
);

const renderCartIcon = (totalItems) => ({ color, size }) => (
  <View style={styles.iconContainer}>
    <Text style={{ fontSize: size, color: 'black' }}>🛒</Text>
    {totalItems > 0 && (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{totalItems}</Text>
      </View>
    )}
  </View>
);

const renderHomeIcon = ({ color, size }) => (
  <Text style={{ fontSize: size, color: 'black' }}>⌂</Text>
);

const renderSearchIcon = ({ color, size }) => (
  <Text style={{ fontSize: size, color: 'black' }}>⌕</Text>
);

const AppNavigator = () => {
  const totalItems = useSelector(selectTotalItems);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarIcon: renderHomeIcon }} />
      <Tab.Screen name="Search" component={SearchStack} options={{ tabBarIcon: renderSearchIcon }} />
      <Tab.Screen name="Cart" component={CartStack} options={{ tabBarIcon: renderCartIcon(totalItems) }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: colors.buttonColor,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default AppNavigator;