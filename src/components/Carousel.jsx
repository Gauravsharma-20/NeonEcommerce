import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors } from '../utils/styleUtils';

const { width } = Dimensions.get('window');

const DISCOUNT_IMAGES = [
  { id: '1', url: 'https://f.nooncdn.com/mpcms/EN0001/assets/4f37876a-5958-4be3-ad0c-520ead2288a6.gif?format=avif' },
  { id: '2', url: 'https://rukminim2.flixcart.com/fk-p-flap/480/210/image/7f0a313b37cc0bde.jpg?q=20' },
  { id: '3', url: 'https://rukminim2.flixcart.com/fk-p-flap/480/210/image/902fc9bb5effaf29.jpeg?q=20' },
  { id: '4', url: 'https://rukminim2.flixcart.com/fk-p-flap/480/210/image/50fc93ea6a08508f.jpg?q=20' },
  { id: '5', url: 'https://rukminim2.flixcart.com/fk-p-flap/480/210/image/d9250824917ce0f4.png?q=20' },
];

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = 150;

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const dataLength = DISCOUNT_IMAGES.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % dataLength;
        flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [dataLength]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
        if (index !== currentIndex) {
          setCurrentIndex(index);
        }
      },
    },
  );

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {DISCOUNT_IMAGES.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: currentIndex === index ? colors.activeDotColor : colors.inactiveDotColor },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DISCOUNT_IMAGES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        onScroll={handleScroll}
        ref={flatListRef}
        scrollEventThrottle={16}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  imageContainer: {
     width: ITEM_WIDTH, 
     alignItems: 'center', 
     marginLeft: 4, 
     marginRight: 4 
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Carousel;