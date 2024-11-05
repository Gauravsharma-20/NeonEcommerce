import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/styleUtils';

const ProductCard = ({ product, navigation }) => {
  const handleProductClick = () => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  return (
    <TouchableOpacity onPress={handleProductClick} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.tagsContainer}>
          {product.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: colors.productCardBackGround,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.productTitle,
  },
  price: {
    marginTop: 5,
    fontSize: 13,
    color: colors.price,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: colors.tagColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 3,
  },
  tagText: {
    color: colors.tagTextColor,
    fontWeight: 'bold',
    fontSize: 9,
  },
});

export default ProductCard;
