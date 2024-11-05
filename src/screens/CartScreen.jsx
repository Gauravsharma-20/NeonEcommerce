import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/slices/cartSlices';
import { fetchCartItems } from '../api/api'; 
import { colors, commonStyles } from '../utils/styleUtils';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation }) => {
  const cartItemsFromRedux = useSelector(selectCartItems);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const fetchedCartItems = await fetchCartItems(cartItemsFromRedux);
        setCartItems(fetchedCartItems);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [cartItemsFromRedux]);

  const totalAmount = cartItems?.reduce(
    (total, item) => item && item.product ? total + item.product.price * item.quantity : total,
    0
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cartItems?.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={commonStyles.emptyMessage}>Your cart is empty!</Text>
          <TouchableOpacity 
            style={commonStyles.secondaryButton} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={commonStyles.secondaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => item && item.product && <CartItem item={item} />}
            keyExtractor={(item) => item?.product?.id?.toString()}
          />
          <Text style={styles.total}>Total: ${totalAmount.toFixed(2)}</Text>
          <TouchableOpacity
            style={commonStyles.primaryButton}
            onPress={() => navigation.navigate('CartReview')}
          >
            <Text style={commonStyles.primaryButtonText}>Checkout</Text>
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',     
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

export default CartScreen;