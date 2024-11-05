import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlices'; 
import { colors, commonStyles } from '../utils/styleUtils';

const deliveryAnimationPath = '../mock/deliveryAnimation.mp4';

const ConfirmationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <Text style={styles.message}>
        Your order has been placed successfully!
      </Text>
      <Video
        source={require(deliveryAnimationPath)}
        style={styles.video}
        resizeMode="contain"
        repeat
        muted
        onLoadStart={() => setLoading(true)} // Show loader when video starts loading
        onLoad={() => setLoading(false)}     // Hide loader when video is ready
      />
      <TouchableOpacity 
        style={commonStyles.secondaryButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={commonStyles.secondaryButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.confirmationScreenBackground,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  video: {
    width: '100%', 
    height: '60%',
  }
});

export default ConfirmationScreen;