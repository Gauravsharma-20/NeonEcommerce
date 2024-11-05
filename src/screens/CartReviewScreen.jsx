import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchCartReviewItems, placeOrder } from '../api/api';
import { commonStyles, colors } from '../utils/styleUtils';
import CartReviewItem from '../components/CartReviewItem';

const CartReviewScreen = ({ navigation }) => {
  const cartItemsFromRedux = useSelector((state) => state.cart.items) || [];
  const paymentMethod = useSelector((state) => state.cart.paymentMethod) || 'Credit Card';
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const fetchedCartItems = await fetchCartReviewItems(cartItemsFromRedux);
        setCartItems(fetchedCartItems);
      } catch (error) {
        console.error('Failed to fetch cart items for review:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [cartItemsFromRedux]);

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.07;
    const grandTotal = subtotal + tax;
    return { subtotal, tax, grandTotal };
  };

  const handlePlaceOrder = async () => {
    try {
      const { success, message } = await placeOrder(cartItems, paymentMethod);
      if (success) {
        navigation.navigate('Confirmation')
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderCartItem = ({ item }) => <CartReviewItem item={item} />;

  const renderEmptyCartMessage = () => (
    <Text style={commonStyles.emptyMessage}>Your cart is empty!</Text>
  );

  const renderOrderSummary = () => {
    const { subtotal, tax, grandTotal } = calculateTotals();
    return (
      <>
        <Text style={styles.paymentMethod}>
          Payment Method: {paymentMethod}
        </Text>
        <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.tax}>Tax: ${tax.toFixed(2)}</Text>
        <Text style={styles.total}>
          Total Amount: ${grandTotal.toFixed(2)}
        </Text>
      </>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? renderEmptyCartMessage() : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id}
          />
          {renderOrderSummary()}
          <TouchableOpacity
            style={commonStyles.primaryButton}
            onPress={handlePlaceOrder}
          >
            <Text style={commonStyles.primaryButtonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primaryBackgroundColor,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtotal: {
    fontSize: 16,
    marginVertical: 5,
  },
  tax: {
    fontSize: 16,
    marginVertical: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartReviewScreen;