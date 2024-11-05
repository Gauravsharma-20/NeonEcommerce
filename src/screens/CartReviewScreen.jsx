import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { commonStyles, colors } from '../utils/styleUtils';
import CartReviewItem from '../components/CartReviewItem';

const CartReviewScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items) || [];
  const paymentMethod = useSelector((state) => state.cart.paymentMethod) || 'Credit Card';

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.07;
    const grandTotal = subtotal + tax;
    return { subtotal, tax, grandTotal };
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

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? ( renderEmptyCartMessage()) 
      : (<>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id}
          />
          {renderOrderSummary()}
          <TouchableOpacity
            style={commonStyles.primaryButton}
            onPress={() => navigation.navigate('Confirmation')}
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
});

export default CartReviewScreen;