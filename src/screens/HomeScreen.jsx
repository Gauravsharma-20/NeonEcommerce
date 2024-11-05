import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { products } from '../mock/products';
import { colors, commonStyles} from '../utils/styleUtils';

const HomeScreen = ({ navigation }) => {
  const renderProductCard = ({ item }) => (
    <ProductCard product={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Carousel />
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={commonStyles.productList}
        />
      ) : (
        <Text style={commonStyles.emptyMessage}>No products available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackgroundColor,
    paddingTop: 10,
  }
});

export default HomeScreen;
