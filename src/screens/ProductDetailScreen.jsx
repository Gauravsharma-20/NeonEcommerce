import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlices';
import { colors } from '../utils/styleUtils';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.product.id === product.id);

  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(cartItem !== undefined);
  }, [cartItem]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    setInCart(true);
  };

  const handleIncreaseQuantity = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(addToCart({ product, quantity: -1 }));
    } else if (cartItem) {
      dispatch(removeFromCart(product.id));
      setInCart(false);
    }
  };

  const renderTags = () => (
    <View style={styles.tagsContainer}>
      {product.tags && product.tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  );

  const renderQuantityControls = () => (
    <View style={styles.quantityControls}>
      <TouchableOpacity style={styles.quantityButton} onPress={handleDecreaseQuantity}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{cartItem ? cartItem.quantity : 0}</Text>
      <TouchableOpacity style={styles.quantityButton} onPress={handleIncreaseQuantity}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      
      {renderTags()}

      {inCart ? renderQuantityControls() : (
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.productTitle,
  },
  price: {
    fontSize: 18,
    color: colors.price,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: colors.tagColor,
    color: colors.tagTextColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  tagText: {
    color: colors.tagTextColor,
    fontSize: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  quantityButton: {
    width: 70,
    height: 35,
    backgroundColor: colors.buttonColor,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 25,
    color: colors.productTitle,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: colors.buttonColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.productTitle,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;