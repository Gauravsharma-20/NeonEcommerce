// CartReviewItem.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../utils/styleUtils';

const CartReviewItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.product.image }} style={styles.image} />
    <View style={styles.itemDetails}>
      <Text style={styles.title}>{item.product.title}</Text>
      <Text style={styles.quantity}>Quantity: x{item.quantity}</Text>
      <Text style={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.cartItemBackgroundColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.productTitle,
  },
  quantity: {
    fontSize: 11,
    color: colors.secondaryTextColor,
  },
  price: {
    fontSize: 14,
    color: colors.price,
  },
});

export default CartReviewItem;
