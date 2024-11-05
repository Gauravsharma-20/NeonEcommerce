import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlices';
import { colors } from '../utils/styleUtils';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  if (!item || !item.product) return null;

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(addToCart({ product: item.product, quantity: -1 }));
    } else {
      dispatch(removeFromCart(item.product.id));
    }
  };

  const handleIncreaseQuantity = () => {
    dispatch(addToCart({ product: item.product, quantity: 1 }));
  };

  const renderImage = () => {
    return item.product.image ? (
      <Image source={{ uri: item.product.image }} style={styles.image} />
    ) : (
      <View style={styles.placeholderImage} />
    );
  };

  const calculatePrice = () => {
    return ((item.product.price || 0) * (item.quantity || 1)).toFixed(2);
  };

  const renderQuantityButtons = () => {
    return (
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecreaseQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity || 0}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={handleIncreaseQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {renderImage()}
      <View style={styles.info}>
        <Text style={styles.title}>{item.product.title || "Untitled Product"}</Text>
        <Text style={styles.price}>Price: ${calculatePrice()}</Text>
        {renderQuantityButtons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: colors.cartItemBackgroundColor,
    padding: 15,
    borderRadius: 12,
    shadowColor: colors.cartItemShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: colors.placeholderBackgroundColor,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.productTitle,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    color: colors.price,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 25,
    height: 25,
    backgroundColor: colors.buttonColor,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.productTitle,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartItem;