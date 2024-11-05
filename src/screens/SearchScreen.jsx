import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { products } from '../mock/products';
import { colors, commonStyles } from '../utils/styleUtils';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={commonStyles.productList}
      />
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
