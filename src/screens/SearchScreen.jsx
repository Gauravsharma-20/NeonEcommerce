import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../api/api'; 
import { colors, commonStyles } from '../utils/styleUtils';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const results = await searchProducts(searchQuery);
          setFilteredProducts(results);
        } catch (error) {
          console.error('Failed to fetch filtered products:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredProducts([]); 
      }
    };

    const timer = setTimeout(() => {
      fetchFilteredProducts();
    }, 300); // Debounce search input

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const renderProductCard = ({ item }) => (
    <ProductCard product={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={commonStyles.productList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  searchBar: {
    padding: 10,
    margin: 16,
    backgroundColor: colors.searchBarBackgroundColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.searchBarBorderColor,
  }
});

export default SearchScreen;