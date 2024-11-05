import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { fetchAvailableProducts } from '../api/api'; 
import { colors, commonStyles } from '../utils/styleUtils';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAvailableProducts = async () => {
      try {
        const fetchedProducts = await fetchAvailableProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch available products:', error);
      } finally {
        setLoading(false);
      }
    };

    getAvailableProducts();
  }, []);

  const renderProductCard = ({ item }) => (
    <ProductCard product={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Carousel />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : products.length > 0 ? (
        <View style={styles.productSection}>
          <Text style={commonStyles.sectionTitle}>Available Products</Text>
          <FlatList
            data={products}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={commonStyles.productList}
          />
        </View>
      ) : (
        <Text style={commonStyles.emptyMessage}>No products available</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackgroundColor,
  },
  productSection: {
    marginTop: 10, 
    paddingHorizontal: 5,
    backgroundColor: colors.primaryBackgroundColor,
  }
});

export default HomeScreen;